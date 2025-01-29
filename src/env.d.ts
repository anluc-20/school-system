/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly PUBLIC_BASE_API_URL: string;
    // más variables de entorno...
  }
  
interface ImportMeta {
readonly env: ImportMetaEnv;
}