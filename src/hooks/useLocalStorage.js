import { useReducer, useEffect } from "react";

export default function useLocalStorage(key, reducer) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const saved = localStorage.getItem(key);
    return {
      tasks: saved !== null ? JSON.parse(saved) : [],
      history: [],
      future: [],
    };
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state.tasks));
  }, [key, state.tasks]);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === key && event.newValue) {
        dispatch({ type: "sync", tasks: JSON.parse(event.newValue) });
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, dispatch]);

  return [state, dispatch];
}
