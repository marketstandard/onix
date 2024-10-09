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

let dbPromise: Promise<IDBPDatabase<ChatDatabaseSchema>>;

export const initDB = async () => {
  dbPromise = openDB<ChatDatabaseSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // db.createObjectStore('checksum', { keyPath: 'checksum' });
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
};

const generateChecksum = (data: any): string => {
  return CryptoJS.SHA256(JSON.stringify(data)).toString(CryptoJS.enc.Hex);
};

export const addItem = async <Key extends StoreNames>(
  storeName: Key,
  item: ChatDatabaseSchema[Key]['value'],
) => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.put(item);
  await tx.done;
};

export const getItemById = async <Key extends StoreNames>(
  storeName: Key,
  id: string,
): Promise<ChatDatabaseSchema[Key]['value'] | undefined> => {
  const db = await dbPromise;
  return await db.get(storeName, id);
};

export const deleteItemById = async <Key extends StoreNames>(storeName: Key, id: string) => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.delete(id);
  await tx.done;
};

export const getAllItems = async <Key extends StoreNames>(
  storeName: Key,
): Promise<ChatDatabaseSchema[Key]['value'][]> => {
  const db = await dbPromise;
  return await db.getAll(storeName);
};

/**
 * @note here for completeness, but be careful in using this
 */
export const clearDatabase = async <Key extends StoreNames>(storeName: Key) => {
  const db = await dbPromise;
  await db.clear(storeName);
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
  const db = await dbPromise;

  const [
    // checksums,
    users,
    chats,
    projects,
    characters,
    tags,
    prompts,
    profiles,
    installedPlugins,
    customModels,
  ] = await Promise.all([
    // db.getAll('checksum'),
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

  return {
    // checksums,
    users,
    chats,
    projects,
    characters,
    tags,
    prompts,
    profiles,
    installedPlugins,
    customModels,
  };
};

export const initializeAppData = async () => {
  const savedData = await getAllData();
  /**
   * @todo Apply defaults and initialize app with saved data
   */

  return savedData;
};

export const deleteAllData = async () => {
  const db = await dbPromise;

  return Promise.all([
    // db.clear('checksum'),
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
};
