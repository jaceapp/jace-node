import { create } from 'zustand'

interface ConfigState {
  api: boolean;
  routes: { [key: string]: string }; // Assuming routes are an object with string keys and values
  setApi: (api: boolean) => void;
  setRoutes: (routes: { [key: string]: string }) => void;
}

const useConfigStore = create<ConfigState>((set) => ({
  api: false,
  routes: {},
  setApi: (api: boolean) => set({ api }),
  setRoutes: (routes: any) => set({ routes }),
}))

export { useConfigStore}