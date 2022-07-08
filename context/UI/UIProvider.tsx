import { ReactNode, useReducer } from "react";
import { UIContext, UIReducer } from ".";

export interface UIState {
  isSidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isSidemenuOpen: false,
};

type UIProviderProps = {
  children: ReactNode;
};

export const UIProvider = ({ children }: UIProviderProps) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => dispatch({ type: "UI - Toggle Sidebar" });

  return (
    <UIContext.Provider
      value={{
        ...state,
        toggleSideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
