import {defineConfig} from 'vite';
import {resolve} from 'node:path';
export default defineConfig({base:'./',build:{target:'es2022',outDir:resolve(import.meta.dirname,'../../site/luz-de-mar-realism'),emptyOutDir:true,chunkSizeWarningLimit:1600}});
