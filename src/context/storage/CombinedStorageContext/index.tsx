import { IndexDatabaseProvider } from '../BrowserStorageContext';

export const StorageContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <IndexDatabaseProvider>{children}</IndexDatabaseProvider>;
};
