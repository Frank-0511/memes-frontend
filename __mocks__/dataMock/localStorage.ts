interface LocalStorageMock {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  clear: () => void;
  removeItem: (key: string) => void;
  getAll: () => Record<string, string>;
}

export const setLocalStorageMock = ({
  ...rewriteMethods
}: Partial<LocalStorageMock>) => {
  const localStorageMock = ((): LocalStorageMock => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => {
        return store[key] || null;
      },
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
      getAll: () => {
        return store;
      },
      ...rewriteMethods,
    };
  })();

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
};
