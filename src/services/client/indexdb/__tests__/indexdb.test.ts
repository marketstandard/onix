import {
  initDB,
  addItem,
  getItemById,
  deleteItemById,
  getAllItems,
  isUsingFallbackStorage,
} from '../index';

const originalIndexedDB = globalThis.indexedDB;

function mockNoIndexedDB() {
  Object.defineProperty(globalThis, 'indexedDB', {
    value: undefined,
    writable: true,
    configurable: true,
  });
}

function restoreIndexedDB() {
  Object.defineProperty(globalThis, 'indexedDB', {
    value: originalIndexedDB,
    writable: true,
    configurable: true,
  });
}

describe('indexdb service fallback', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    restoreIndexedDB();
  });

  describe('when indexedDB is not available', () => {
    beforeEach(async () => {
      mockNoIndexedDB();
      const indexdb = await import('../index');
      await indexdb.initDB();
    });

    it('should use in-memory fallback storage', async () => {
      const indexdb = await import('../index');
      expect(indexdb.isUsingFallbackStorage()).toBe(true);
    });

    it('should add and retrieve items from in-memory storage', async () => {
      const indexdb = await import('../index');
      const testUser = { id: 'test-user-1', name: 'Test User' };

      await indexdb.addItem('users', testUser as any);
      const retrieved = await indexdb.getItemById('users', 'test-user-1');

      expect(retrieved).toEqual(testUser);
    });

    it('should get all items from in-memory storage', async () => {
      const indexdb = await import('../index');
      const testUsers = [
        { id: 'user-1', name: 'User 1' },
        { id: 'user-2', name: 'User 2' },
      ];

      await indexdb.addItem('users', testUsers[0] as any);
      await indexdb.addItem('users', testUsers[1] as any);

      const allUsers = await indexdb.getAllItems('users');
      expect(allUsers).toHaveLength(2);
      expect(allUsers).toContainEqual(testUsers[0]);
      expect(allUsers).toContainEqual(testUsers[1]);
    });

    it('should delete items from in-memory storage', async () => {
      const indexdb = await import('../index');
      const testUser = { id: 'test-user-delete', name: 'Test User' };

      await indexdb.addItem('users', testUser as any);
      await indexdb.deleteItemById('users', 'test-user-delete');

      const retrieved = await indexdb.getItemById('users', 'test-user-delete');
      expect(retrieved).toBeUndefined();
    });

    it('should handle getAllData with in-memory storage', async () => {
      const indexdb = await import('../index');
      const testChat = { id: 'chat-1', title: 'Test Chat', messages: [] };

      await indexdb.addItem('chats', testChat as any);
      const allData = await indexdb.getAllData();

      expect(allData.chats).toContainEqual(testChat);
      expect(allData.users).toEqual([]);
    });
  });

  describe('isUsingFallbackStorage helper', () => {
    it('should detect when fallback is in use', async () => {
      mockNoIndexedDB();
      const indexdb = await import('../index');
      await indexdb.initDB();
      expect(indexdb.isUsingFallbackStorage()).toBe(true);
    });
  });
});
