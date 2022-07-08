import { createContext } from "react";

interface ContextProps {
  isSidemenuOpen: boolean;

  // Methods
  toggleSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
