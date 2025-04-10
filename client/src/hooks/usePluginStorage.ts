import { useEffect, useState } from "react";

export function usePluginStorage<T>(key: string, initialData: T): [T, (data: T) => void, string] {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<string>("");

  const loadData = () => {
    try {
      let items = initialData;
      const stored = localStorage.getItem(key);
      if (stored) {
        items = JSON.parse(stored);
      }

      setData(items);
    } catch (error) {
      setError("Error retrieving items from storage");
      console.error("Error retrieving items from storage:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [key]);

  const saveData = (newData: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(newData));
    } catch (error) {
      setError("Error saving items into storage");
      console.error("Error saving:", error);
    }
    setData(newData);
  };

  return [data, saveData, error];
}
