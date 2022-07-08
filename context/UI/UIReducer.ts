import { UIState } from ".";

type UIActionType = { type: "UI - Toggle Sidebar" };

export const UIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Toggle Sidebar":
      return {
        ...state,
        isSidemenuOpen: !state.isSidemenuOpen,
      };

    default:
      return state;
  }
};
