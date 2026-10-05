/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_WARD_CODE?: string;
  readonly VITE_RESIDENT_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
