import { createContext } from "react";

interface ContextProps {
  isSidemenuOpen: boolean;

  // Methods
  closeSideMenu: () => void;
  openSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
