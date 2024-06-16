interface ConfigState {
    api: boolean;
    routes: {
        [key: string]: string;
    };
    setApi: (api: boolean) => void;
    setRoutes: (routes: {
        [key: string]: string;
    }) => void;
}
declare const useConfigStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ConfigState>>;
export { useConfigStore };
