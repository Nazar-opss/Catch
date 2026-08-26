import { create } from "zustand";

export type ViewLayout = "grid" | "list";

interface UIState {
  isExpanded: boolean;
  setInitialState: (expanded: boolean) => void;
  toggleExpanded: () => void;
  layout: ViewLayout;
  setLayout: (newLayout: ViewLayout) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isExpanded: false,
  layout: "grid",

  setInitialState: (expanded) => set({ isExpanded: expanded }),

  toggleExpanded: () =>
    set((state) => {
      const newState = !state.isExpanded;

      document.cookie = `ui_expanded=${newState}; path=/; max-age=31536000`;
      return { isExpanded: newState };
    }),

  setLayout: (newLayout) =>
    set(() => {
      document.cookie = `ui_layout=; path=/; max-age=0`;

      document.cookie = `ui_layout=${newLayout}; path=/; max-age=31536000; SameSite=Lax`;
      return { layout: newLayout };
    }),
}));
