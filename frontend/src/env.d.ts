interface ImportMetaEnv {
  readonly VITE_AUTH_API: string;
  readonly VITE_HABITS_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
