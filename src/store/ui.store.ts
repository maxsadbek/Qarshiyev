import { create } from 'zustand';

// ============================================================
// UI Store (Zustand)
// ============================================================
// TODO: Add sidebar, modal, drawer, and notification state
// TODO: Integrate with React Hot Toast for notification callbacks

export interface UIState {
  sidebarOpen: boolean;
  modalOpen: boolean | string;
  drawerOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  toggleDrawer: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  modalOpen: false,
  drawerOpen: false,
  theme: 'light',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  openModal: (modalOpen) => set({ modalOpen }),
  closeModal: () => set({ modalOpen: false }),
  toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
  setTheme: (theme) => set({ theme }),
}));
