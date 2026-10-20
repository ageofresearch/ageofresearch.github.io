import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
await build({absWorkingDir:fileURLToPath(new URL('.',import.meta.url)),entryPoints:['marina-parity-runtime.mjs'],bundle:true,preserveSymlinks:true,format:'esm',outfile:fileURLToPath(new URL('../../site/marina-casa-de-campo/assets/yacht-parity-runtime-r110-performance1.js',import.meta.url))});
