import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { Message, useChat, useCompletion } from '@ai-sdk/react';
import { generateId } from '@ai-sdk/ui-utils';
import { HistoryMode } from 'constants/chat';
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
import {
  ChatDatabaseSchema,
  StoreNames,
  addItem,
  deleteItemById,
  getAllItems,
  getItemById,
  initDB,
  initializeAppData,
} from 'services/client/indexdb';
import { useApiGateway } from 'hooks/useApi';

type DatabaseState = {
  [Key in StoreNames]: ChatDatabaseSchema[Key]['value'][];
};

type LocalState = {
  activeChatId: string;
  historyMode: HistoryMode;
};

type State = DatabaseState & LocalState;

type Action<Key extends StoreNames> =
  | { type: 'ADD_ITEM'; storeName: Key; item: ChatDatabaseSchema[Key]['value'] }
  | { type: 'TOGGLE_IS_SAVE_CHAT'; storeName: Key; item: ChatDatabaseSchema[Key]['value'] }
  | { type: 'DELETE_ITEM'; storeName: Key; id: string }
  | { type: 'SET_ITEMS'; storeName: Key; items: ChatDatabaseSchema[Key]['value'][] }
  | { type: 'SET_ACTIVE_CHAT'; id: string }
  | { type: 'SET_HISTORY_MODE'; mode: HistoryMode };

const databaseReducer = <Key extends StoreNames>(state: State, action: Action<Key>): State => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const matchingItem = state[action.storeName].find((item) => item.id === action.item.id);
      const updatedItems = state[action.storeName].filter((item) => item.id !== action.item.id);
      return {
        ...state,
        [action.storeName]: [{ ...(matchingItem || {}), ...action.item }, ...updatedItems],
      };
    }
    case 'DELETE_ITEM':
      return {
        ...state,
        [action.storeName]: state[action.storeName].filter((item) => item.id !== action.id),
      };
    case 'SET_ITEMS':
      return {
        ...state,
        [action.storeName]: action.items,
      };
    case 'SET_ACTIVE_CHAT':
      return {
        ...state,
        activeChatId: action.id,
      };
    case 'SET_HISTORY_MODE':
      return {
        ...state,
        historyMode: action.mode,
      };
    case 'TOGGLE_IS_SAVE_CHAT': {
      const matchingItem = state[action.storeName].find((item) => item.id === action.item.id);
      const updatedItems = state[action.storeName].filter((item) => item.id !== action.item.id);
      return {
        ...state,
        [action.storeName]: [{ ...(matchingItem || {}), ...action.item }, ...updatedItems],
      };
    }
    default:
      return state;
  }
};

const initialState: State = {
  // checksum: [],
  users: [],
  chats: [],
  projects: [],
  characters: [],
  tags: [],
  prompts: [],
  profiles: [],
  installedPlugins: [],
  customModels: [],
  activeChatId: generateId(),
  historyMode: HistoryMode.Local,
};

// Define the context
interface BrowserStorageContextType {
  state: DatabaseState;
  dispatch: React.Dispatch<Action<StoreNames>>;
  addItem: <Key extends StoreNames>(
    storeName: Key,
    item: ChatDatabaseSchema[Key]['value'],
  ) => Promise<void>;
  getItemById: <Key extends StoreNames>(
    storeName: Key,
    id: string,
  ) => Promise<ChatDatabaseSchema[Key]['value'] | undefined>;
  deleteItemById: <Key extends StoreNames>(storeName: Key, id: string) => Promise<void>;
  getAllItems: <Key extends StoreNames>(
    storeName: Key,
  ) => Promise<ChatDatabaseSchema[Key]['value'][]>;
  activeChatId: string;
  activeChat: ChatDatabaseSchema['chats']['value'];
  setActiveChatId: (id: string) => void;
  startNewChat: () => void;
  generateTitle: () => void;
  togglePinChat: (isPinned: boolean) => void;
  toggleIsSavingChat: () => void;
  setTags: (params: { chatId: string; tags: ChatDatabaseSchema['tags']['value'][] }) => void;
  setProject: ({
    chatId,
    project,
  }: {
    chatId: string;
    project: Pick<Project, 'id' | 'title'>;
  }) => void;
  setTitle: (title: string) => void;
  updateMessages: (messages: Message[]) => void;
  setHistoryMode: (mode: HistoryMode) => void;
  historyMode: HistoryMode;
}

export const BrowserStorageContext = createContext<BrowserStorageContextType | undefined>(
  undefined,
);

export const IndexDatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(databaseReducer, initialState);
  const activeChatId = state.activeChatId;
  const activeChat = state.chats.find((c) => c.id === state.activeChatId);
  // const {
  //   completion,
  //   complete,
  //   isLoading: isLoadingTitle,
  //   setCompletion,
  // } = useCompletion({
  //   api: '/api/title',
  // });
  const { post: complete, isLoading: isLoadingTitle } = useApiGateway('/title');

  useEffect(() => {
    const initializeStorage = async () => {
      await initDB();
      const initialData = await initializeAppData();
      for (const key in initialData) {
        dispatch({ type: 'SET_ITEMS', storeName: key as StoreNames, items: initialData[key] });
      }
      try {
        const historyMode = localStorage.getItem('historyMode');
        if (historyMode) {
          dispatch({ type: 'SET_HISTORY_MODE', mode: historyMode as HistoryMode });
        }
      } catch (error) {}
    };
    initializeStorage();
  }, []);

  const addChatToStore = async <Key extends StoreNames>(
    storeName: Key,
    item: ChatDatabaseSchema[Key]['value'],
  ) => {
    const findExistingItem = state[storeName].find((i) => i.id === item.id);
    const newItem = {
      isSavingChat: state.historyMode !== HistoryMode.Off, // Use default, otherwise it will be overwritten by the previous chat or item
      ...(findExistingItem || {}),
      ...item,
    };

    dispatch({ type: 'ADD_ITEM', storeName, item: newItem });

    if (newItem.isSavingChat) {
      await addItem(storeName, newItem);
    }
  };

  const itemUpdateIsSaveChat = async <Key extends StoreNames>(
    storeName: Key,
    item: ChatDatabaseSchema[Key]['value'],
  ) => {
    const findExistingItem = state[storeName].find((i) => i.id === item.id);
    const newItem = {
      isSavingChat: state.historyMode !== HistoryMode.Off,
      ...(findExistingItem || {}),
      ...item,
    };
    dispatch({ type: 'TOGGLE_IS_SAVE_CHAT', storeName, item: newItem });
    await addItem(storeName, newItem);
  };

  const getItemByIdFromStore = async <Key extends StoreNames>(storeName: Key, id: string) => {
    return await getItemById(storeName, id);
  };

  const deleteItemByIdFromStore = async <Key extends StoreNames>(storeName: Key, id: string) => {
    await deleteItemById(storeName, id);
    dispatch({ type: 'DELETE_ITEM', storeName, id });
  };

  const getAllItemsFromStore = async <Key extends StoreNames>(storeName: Key) => {
    return await getAllItems(storeName);
  };

  const generateTitle = async () => {
    const id = state.activeChatId;
    if (
      activeChat &&
      !activeChat.title &&
      activeChat.messages.length > 1 &&
      activeChat.messages.length < 4 &&
      !isLoadingTitle
    ) {
      const contentForTitle = activeChat.messages.map((m) => m.content).join('\n\n');
      const response = await complete({
        payload: {
          prompt: contentForTitle,
        },
      });
      const title = response.data.text;
      const updatedChat = { id, ...activeChat, title };
      addChatToStore('chats', updatedChat);
    }
  };

  const togglePinChat = async (isPinned: boolean) => {
    const id = state.activeChatId;
    if (activeChat) {
      const updatedChat = {
        id,
        ...activeChat,
        pinnedAt: isPinned ? new Date().toISOString() : null,
      };
      addChatToStore('chats', updatedChat);
    }
  };

  const toggleIsSavingChat = async () => {
    const id = state.activeChatId;
    if (activeChat) {
      const updatedChat = {
        id,
        ...activeChat,
        isSavingChat: !activeChat?.isSavingChat,
      };
      itemUpdateIsSaveChat('chats', updatedChat);
    }
  };

  const setTags = async ({
    chatId,
    tags,
  }: {
    chatId: string;
    tags: ChatDatabaseSchema['tags']['value'][];
  }) => {
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      await addItem('tags', tag);
      dispatch({
        type: 'ADD_ITEM',
        storeName: 'tags',
        item: tag,
      });
    }
    const findExistingItem = state['chats'].find((i) => i.id === chatId);
    if (!findExistingItem) {
      return;
    }
    const chatItem = {
      ...findExistingItem,
      tags: tags,
    };
    dispatch({ type: 'ADD_ITEM', storeName: 'chats', item: chatItem });
    await addItem('chats', chatItem);
  };

  const setProject = async ({
    chatId,
    project,
  }: {
    chatId: string;
    project: Pick<Project, 'id' | 'title'>;
  }) => {
    if (!project) {
      const findExistingItem = state['chats'].find((i) => i.id === chatId);
      if (!findExistingItem) {
        return;
      }
      const chatItem = {
        ...findExistingItem,
        projectId: null,
      };
      dispatch({ type: 'ADD_ITEM', storeName: 'chats', item: chatItem });
      await addItem('chats', chatItem);

      return;
    }

    const existingProject = state.projects.find((p) => p.id === project?.id);
    const projectItem: Project = {
      description: '',
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syncedAt: new Date().toISOString(),
      isOpen: false,
      order: state.projects.length,
      ...(existingProject ? existingProject : {}),
      ...project,
    };
    dispatch({
      type: 'ADD_ITEM',
      storeName: 'projects',
      item: projectItem,
    });
    await addItem('projects', projectItem);

    const findExistingItem = state['chats'].find((i) => i.id === chatId);
    if (!findExistingItem) {
      return;
    }
    const chatItem = {
      ...findExistingItem,
      projectId: project.id,
    };
    dispatch({ type: 'ADD_ITEM', storeName: 'chats', item: chatItem });
    await addItem('chats', chatItem);
  };

  const updateMessages = async (messages: Message[]) => {
    const hasActiveChat = !!activeChat;
    const isSavingChat = !!activeChat?.isSavingChat;
    const hasMessages = !!messages.length;
    const isGlobalSaving = state.historyMode !== HistoryMode.Off;

    if (!hasMessages) {
      return;
    }

    if (hasActiveChat && !isSavingChat) {
      return;
    }

    if (!hasActiveChat && !isGlobalSaving) {
      return;
    }

    const id = state.activeChatId;

    if (id) {
      const updatedChat = { id, ...activeChat, messages };
      const now = new Date().toISOString();

      if (!updatedChat.createdAt) {
        updatedChat.createdAt = now;
        updatedChat.updatedAt = now;
      }

      if (activeChat && activeChat.messages.length !== messages.length) {
        updatedChat.updatedAt = new Date().toISOString();
      }

      addChatToStore('chats', updatedChat);
    }
  };

  const setTitle = async (title: string) => {
    const id = state.activeChatId;
    if (activeChat) {
      const updatedChat = {
        id,
        ...activeChat,
        title,
      };
      const findExistingItem = state.chats.find((i) => i.id === id);
      const newItem = {
        ...(findExistingItem || {}),
        ...updatedChat,
      };
      dispatch({ type: 'ADD_ITEM', storeName: 'chats', item: newItem });
      await addItem('chats', newItem);
    }
  };

  const setHistoryMode = async (mode: HistoryMode) => {
    dispatch({ type: 'SET_HISTORY_MODE', mode });
    try {
      localStorage.setItem('historyMode', mode);
    } catch (error) {}
  };

  const contextValue: BrowserStorageContextType = {
    state,
    dispatch,
    activeChat,
    activeChatId,
    setActiveChatId: (id: string) => {
      dispatch({ type: 'SET_ACTIVE_CHAT', id });
    },
    startNewChat: () => {
      const newChatId = generateId();
      dispatch({ type: 'SET_ACTIVE_CHAT', id: newChatId });
    },
    generateTitle,
    togglePinChat,
    toggleIsSavingChat,
    setTags,
    setProject,
    setTitle,
    updateMessages,
    addItem: addChatToStore,
    getItemById: getItemByIdFromStore,
    deleteItemById: deleteItemByIdFromStore,
    getAllItems: getAllItemsFromStore,
    setHistoryMode,
    historyMode: state.historyMode,
  };

  return (
    <BrowserStorageContext.Provider value={contextValue}>{children}</BrowserStorageContext.Provider>
  );
};

export const useBrowserStorage = (): BrowserStorageContextType => {
  const context = useContext(BrowserStorageContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
