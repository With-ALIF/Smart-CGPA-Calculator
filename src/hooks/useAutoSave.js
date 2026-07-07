import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export function useAutoSave(dataToSave, saveFunction, delay = 1000) {
  const { user } = useAuth();
  const isFirstRender = useRef(true);
  const dataRef = useRef(dataToSave);

  useEffect(() => {
    dataRef.current = dataToSave;
  }, [dataToSave]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!user) return;

    const handler = setTimeout(async () => {
      try {
        await saveFunction(dataRef.current);
      } catch (err) {
        console.error('Auto-save error:', err);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [dataToSave, user, delay, saveFunction]);
}
