import { createContext, useMemo } from "react";
import useWindowManager from "../hooks/useWindowManager";

const WindowManagerContext = createContext(null);

export const WindowManagerProvider = ({ children }) => {
  const manager = useWindowManager();
  const value = useMemo(() => manager, [manager]);

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
};

export default WindowManagerProvider;
