import './marina-diagnostics-v3.mjs';
import {MarinaApp} from './MarinaApp-Yacht36m.js';
import {installYacht} from './yacht-experience-r110-memory-fix1.js';
try {
 const app=new MarinaApp();window.__marina=app;
 await app.init();
 app.yacht=installYacht(app);
} catch(error) {
 const status=document.querySelector('#status');status.hidden=false;
 status.textContent='The marina could not start. '+error.message+' Try a WebGL 2 capable browser and reload.';
 document.documentElement.dataset.ready='failed';console.error(error);
}
