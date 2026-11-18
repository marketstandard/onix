import CryptoJS from 'crypto-js';
import { DBSchema, IDBPDatabase, openDB } from 'idb';
import {
  Character,
  Chat,
  Checksum,
  CustomModel,
  InstalledPlugin,
  Profile,
  Project,
  Schema,
  Tag,
  User,
  UserPrompts,
} from 'constants/schema/types';

function isIndexedDBAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    if (!('indexedDB' in window) || !window.indexedDB) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

class InMemoryStorage {
  private stores: Map<string, Map<string, any>> = new Map();

  constructor(storeNames: string[]) {
    for (const name of storeNames) {
      this.stores.set(name, new Map());
    }
  }

  async put<T extends { id: string }>(storeName: string, item: T): Promise<void> {
    const store = this.stores.get(storeName);
    if (store) {
      store.set(item.id, item);
    }
  }

  async get<T>(storeName: string, id: string): Promise<T | undefined> {
    const store = this.stores.get(storeName);
    return store?.get(id);
  }

  async delete(storeName: string, id: string): Promise<void> {
    const store = this.stores.get(storeName);
    if (store) {
      store.delete(id);
    }
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    const store = this.stores.get(storeName);
    return store ? Array.from(store.values()) : [];
  }

  async clear(storeName: string): Promise<void> {
    const store = this.stores.get(storeName);
    if (store) {
      store.clear();
    }
  }
}

let inMemoryStorage: InMemoryStorage | null = null;
let usingInMemoryFallback = false;

export interface ChatDatabaseSchema extends DBSchema {
  // checksum: {
  //   key: string;
  //   value: Checksum;
  // };
  users: {
    key: string;
    value: User;
  };
  chats: {
    key: string;
    value: Chat;
  };
  projects: {
    key: string;
    value: Project;
  };
  characters: {
    key: string;
    value: Character;
  };
  tags: {
    key: string;
    value: Tag;
  };
  prompts: {
    key: string;
    value: UserPrompts;
  };
  profiles: {
    key: string;
    value: Profile;
  };
  installedPlugins: {
    key: string;
    value: InstalledPlugin;
  };
  customModels: {
    key: string;
    value: CustomModel;
  };
}

const storeNames = {
  // checksum: 'checksum',
  users: 'users',
  chats: 'chats',
  projects: 'projects',
  characters: 'characters',
  tags: 'tags',
  prompts: 'prompts',
  profiles: 'profiles',
  installedPlugins: 'installedPlugins',
  customModels: 'customModels',
} as const;

export type StoreNames = keyof typeof storeNames;

const DB_NAME = 'ChatDatabase';
const DB_VERSION = 1;

const ALL_STORE_NAMES: StoreNames[] = [
  'users',
  'chats',
  'projects',
  'characters',
  'tags',
  'prompts',
  'profiles',
  'installedPlugins',
  'customModels',
];

let dbPromise: Promise<IDBPDatabase<ChatDatabaseSchema>> | null = null;

export const isUsingFallbackStorage = (): boolean => usingInMemoryFallback;

export const initDB = async () => {
  if (!isIndexedDBAvailable()) {
    usingInMemoryFallback = true;
    inMemoryStorage = new InMemoryStorage(ALL_STORE_NAMES);
    return;
  }

  try {
    dbPromise = openDB<ChatDatabaseSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore('users', { keyPath: 'id' });
        db.createObjectStore('chats', { keyPath: 'id' });
        db.createObjectStore('projects', { keyPath: 'id' });
        db.createObjectStore('characters', { keyPath: 'id' });
        db.createObjectStore('tags', { keyPath: 'id' });
        db.createObjectStore('prompts', { keyPath: 'id' });
        db.createObjectStore('profiles', { keyPath: 'id' });
        db.createObjectStore('installedPlugins', { keyPath: 'id' });
        db.createObjectStore('customModels', { keyPath: 'id' });
      },
    });
    await dbPromise;
  } catch (error) {
    usingInMemoryFallback = true;
    inMemoryStorage = new InMemoryStorage(ALL_STORE_NAMES);
    dbPromise = null;
  }
};

const generateChecksum = (data: any): string => {
  return CryptoJS.SHA256(JSON.stringify(data)).toString(CryptoJS.enc.Hex);
};

export const addItem = async <Key extends StoreNames>(
  storeName: Key,
  item: ChatDatabaseSchema[Key]['value'],
) => {
  if (usingInMemoryFallback && inMemoryStorage) {
    await inMemoryStorage.put(storeName, item as { id: string });
    return;
  }

  if (!dbPromise) {
    return;
  }

  try {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.put(item);
    await tx.done;
  } catch (error) {
    if (!usingInMemoryFallback) {
      usingInMemoryFallback = true;
      inMemoryStorage = new InMemoryStorage(ALL_STORE_NAMES);
      await inMemoryStorage.put(storeName, item as { id: string });
    }
  }
};

export const getItemById = async <Key extends StoreNames>(
  storeName: Key,
  id: string,
): Promise<ChatDatabaseSchema[Key]['value'] | undefined> => {
  if (usingInMemoryFallback && inMemoryStorage) {
    return inMemoryStorage.get(storeName, id);
  }

  if (!dbPromise) {
    return undefined;
  }

  try {
    const db = await dbPromise;
    return await db.get(storeName, id);
  } catch (error) {
    if (!usingInMemoryFallback) {
      usingInMemoryFallback = true;
      inMemoryStorage = new InMemoryStorage(ALL_STORE_NAMES);
    }
    return undefined;
  }
};

export const deleteItemById = async <Key extends StoreNames>(storeName: Key, id: string) => {
  if (usingInMemoryFallback && inMemoryStorage) {
    await inMemoryStorage.delete(storeName, id);
    return;
  }

  if (!dbPromise) {
    return;
  }

  try {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.delete(id);
    await tx.done;
  } catch (error) {
    if (!usingInMemoryFallback) {
      usingInMemoryFallback = true;
      inMemoryStorage = new InMemoryStorage(ALL_STORE_NAMES);
    }
  }
};

export const getAllItems = async <Key extends StoreNames>(
  storeName: Key,
): Promise<ChatDatabaseSchema[Key]['value'][]> => {
  if (usingInMemoryFallback && inMemoryStorage) {
    return inMemoryStorage.getAll(storeName);
  }

  if (!dbPromise) {
    return [];
  }

  try {
    const db = await dbPromise;
    return await db.getAll(storeName);
  } catch (error) {
    if (!usingInMemoryFallback) {
      usingInMemoryFallback = true;
      inMemoryStorage = new InMemoryStorage(ALL_STORE_NAMES);
    }
    return [];
  }
};

/**
 * @note here for completeness, but be careful in using this
 */
export const clearDatabase = async <Key extends StoreNames>(storeName: Key) => {
  if (usingInMemoryFallback && inMemoryStorage) {
    await inMemoryStorage.clear(storeName);
    return;
  }

  if (!dbPromise) {
    return;
  }

  try {
    const db = await dbPromise;
    await db.clear(storeName);
  } catch (error) {
    if (!usingInMemoryFallback) {
      usingInMemoryFallback = true;
      inMemoryStorage = new InMemoryStorage(ALL_STORE_NAMES);
    }
  }
};

// Checksum
// export const addChecksum = async (item: Checksum) => addItem('checksum', item);
// export const getChecksumById = async (id: string) => getItemById('checksum', id);
// export const deleteChecksumById = async (id: string) => deleteItemById('checksum', id);
// export const getAllChecksums = async () => getAllItems('checksum');

// Users
export const addUser = async (item: User) => addItem('users', item);
export const getUserById = async (id: string) => getItemById('users', id);
export const deleteUserById = async (id: string) => deleteItemById('users', id);
export const getAllUsers = async () => getAllItems('users');

// Chats
export const addChat = async (item: Chat) => addItem('chats', item);
export const getChatById = async (id: string) => getItemById('chats', id);
export const deleteChatById = async (id: string) => deleteItemById('chats', id);
export const getAllChats = async () => getAllItems('chats');

// projects
export const addProject = async (item: Project) => addItem('projects', item);
export const getProjectById = async (id: string) => getItemById('projects', id);
export const deleteProjectById = async (id: string) => deleteItemById('projects', id);
export const getAllProjects = async () => getAllItems('projects');

// Characters
export const addCharacter = async (item: Character) => addItem('characters', item);
export const getCharacterById = async (id: string) => getItemById('characters', id);
export const deleteCharacterById = async (id: string) => deleteItemById('characters', id);
export const getAllCharacters = async () => getAllItems('characters');

// Tags
export const addTag = async (item: Tag) => addItem('tags', item);
export const getTagById = async (id: string) => getItemById('tags', id);
export const deleteTagById = async (id: string) => deleteItemById('tags', id);
export const getAllTags = async () => getAllItems('tags');

// Prompts
export const addPrompt = async (item: UserPrompts) => addItem('prompts', item);
export const getPromptById = async (id: string) => getItemById('prompts', id);
export const deletePromptById = async (id: string) => deleteItemById('prompts', id);
export const getAllPrompts = async () => getAllItems('prompts');

// Profiles
export const addProfile = async (item: Profile) => addItem('profiles', item);
export const getProfileById = async (id: string) => getItemById('profiles', id);
export const deleteProfileById = async (id: string) => deleteItemById('profiles', id);
export const getAllProfiles = async () => getAllItems('profiles');

// Installed Plugins
export const addInstalledPlugin = async (item: InstalledPlugin) =>
  addItem('installedPlugins', item);
export const getInstalledPluginById = async (id: string) => getItemById('installedPlugins', id);
export const deleteInstalledPluginById = async (id: string) =>
  deleteItemById('installedPlugins', id);
export const getAllInstalledPlugins = async () => getAllItems('installedPlugins');

// Custom Models
export const addCustomModel = async (item: CustomModel) => addItem('customModels', item);
export const getCustomModelById = async (id: string) => getItemById('customModels', id);
export const deleteCustomModelById = async (id: string) => deleteItemById('customModels', id);
export const getAllCustomModels = async () => getAllItems('customModels');

export const getAllData = async () => {
  if (usingInMemoryFallback && inMemoryStorage) {
    const [users, chats, projects, characters, tags, prompts, profiles, installedPlugins, customModels] =
      await Promise.all([
        inMemoryStorage.getAll('users'),
        inMemoryStorage.getAll('chats'),
        inMemoryStorage.getAll('projects'),
        inMemoryStorage.getAll('characters'),
        inMemoryStorage.getAll('tags'),
        inMemoryStorage.getAll('prompts'),
        inMemoryStorage.getAll('profiles'),
        inMemoryStorage.getAll('installedPlugins'),
        inMemoryStorage.getAll('customModels'),
      ]);

    return { users, chats, projects, characters, tags, prompts, profiles, installedPlugins, customModels };
  }

  if (!dbPromise) {
    return {
      users: [],
      chats: [],
      projects: [],
      characters: [],
      tags: [],
      prompts: [],
      profiles: [],
      installedPlugins: [],
      customModels: [],
    };
  }

  try {
    const db = await dbPromise;

    const [users, chats, projects, characters, tags, prompts, profiles, installedPlugins, customModels] =
      await Promise.all([
        db.getAll('users'),
        db.getAll('chats'),
        db.getAll('projects'),
        db.getAll('characters'),
        db.getAll('tags'),
        db.getAll('prompts'),
        db.getAll('profiles'),
        db.getAll('installedPlugins'),
        db.getAll('customModels'),
      ]);

    return { users, chats, projects, characters, tags, prompts, profiles, installedPlugins, customModels };
  } catch (error) {
    if (!usingInMemoryFallback) {
      usingInMemoryFallback = true;
      inMemoryStorage = new InMemoryStorage(ALL_STORE_NAMES);
    }
    return {
      users: [],
      chats: [],
      projects: [],
      characters: [],
      tags: [],
      prompts: [],
      profiles: [],
      installedPlugins: [],
      customModels: [],
    };
  }
};

export const initializeAppData = async () => {
  const savedData = await getAllData();
  /**
   * @todo Apply defaults and initialize app with saved data
   */

  return savedData;
};

export const deleteAllData = async () => {
  if (usingInMemoryFallback && inMemoryStorage) {
    return Promise.all(ALL_STORE_NAMES.map((name) => inMemoryStorage!.clear(name)));
  }

  if (!dbPromise) {
    return;
  }

  try {
    const db = await dbPromise;

    return Promise.all([
      db.clear('users'),
      db.clear('chats'),
      db.clear('projects'),
      db.clear('characters'),
      db.clear('tags'),
      db.clear('prompts'),
      db.clear('profiles'),
      db.clear('installedPlugins'),
      db.clear('customModels'),
    ]);
  } catch (error) {
    if (!usingInMemoryFallback) {
      usingInMemoryFallback = true;
      inMemoryStorage = new InMemoryStorage(ALL_STORE_NAMES);
    }
  }
};
