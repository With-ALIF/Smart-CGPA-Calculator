import { createContext, useContext, useState, useEffect } from 'react';

const SyncContext = createContext();

export function SyncProvider({ children }) {
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle', 'syncing', 'error', 'saved'
  const [lastSynced, setLastSynced] = useState(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(() => {
    const stored = localStorage.getItem('cgpa-auto-save');
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem('cgpa-auto-save', JSON.stringify(autoSaveEnabled));
  }, [autoSaveEnabled]);

  const value = {
    syncStatus,
    setSyncStatus,
    lastSynced,
    setLastSynced,
    autoSaveEnabled,
    setAutoSaveEnabled
  };

  return (
    <SyncContext.Provider value={value}>
      {children}
    </SyncContext.Provider>
  );
}

export function useSync() {
  return useContext(SyncContext);
}
