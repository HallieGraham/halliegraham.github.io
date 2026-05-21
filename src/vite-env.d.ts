/// <reference types="vite/client" />

declare module "@fontsource-variable/inter";

interface ImportMetaEnv {
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
