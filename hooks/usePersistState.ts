import { Dispatch, SetStateAction, useEffect, useState } from "react";

type StateReturn<T> = [T, Dispatch<SetStateAction<T>>];

export function usePersistState<T>(
  key: string,
  initialState: T
): StateReturn<T> {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initialState;
    const item = localStorage.getItem(key);

    if (item && item !== "undefined") {
      return JSON.parse(item);
    }

    return initialState;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}

export default usePersistState;
