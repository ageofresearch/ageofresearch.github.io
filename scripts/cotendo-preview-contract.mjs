import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';

// A specific owner-authorized computer trial. Stable releases retain all their
// browser, visual and performance gates in validate-cotendo.mjs.
const MANIFEST='e77adb57bc6d935b290ab8b4c8627229222222954d53c16309f446d8e942256f';
const SOURCE='ee16621e1a6c0d44fe6062d64b757f0b0aa48751';
export function validateCotendoUserPreview({site,release,acceptance,manifestSha256}){
 assert.equal(manifestSha256,MANIFEST,'Only the explicitly reviewed trial artifact is allowed');
 assert.equal(release.authoringCommit,SOURCE);
 assert.equal(acceptance.status,'user-preview');
 assert.equal(acceptance.releaseChannel,'user-preview');
 assert.equal(acceptance.authoringCommit,SOURCE);
 assert.equal(acceptance.testedManifestSha256,MANIFEST);
 assert.deepEqual(acceptance.source,release.source);
 assert.equal(acceptance.stableAcceptance,false);
 assert.equal(acceptance.performancePassed,false);
 assert.equal(acceptance.visualAccepted,false);
 assert.equal(acceptance.publicationAuthorization,'owner-requested-computer-trial');
 assert.equal(acceptance.nativeValidation.status,'passed');
 assert.equal(acceptance.evidence.workflowRun,'https://github.com/ageofresearch/tidewater-rocha/actions/runs/42844204348');
 assert.equal(acceptance.evidence.candidateArtifactId,13778116283);
 assert.equal(acceptance.knownIssues.performance.status,'failed');
 assert.deepEqual(acceptance.knownIssues.performance.limits,{medianRatio:1.2,p95Ratio:1.25});
 assert.equal(acceptance.knownIssues.visual.status,'incomplete-with-failures');
 assert.equal(acceptance.previousStable.publicCommit,'ca703dc5b054b694ee3234eafa9a165920f6fbe7');
 const sha=file=>createHash('sha256').update(readFileSync(file)).digest('hex');
 for(const name of ['paving','paving-appearance','paving-elision','paving-material-sharing','paving-sun','paving-lighting']){
  const file='data/'+name+'-audit.json';
  assert.equal(acceptance.nativeValidation.files[file],release.files[file]);
 }
 assert.equal(Object.keys(acceptance.preservedStudy).length,20);
 for(const[name,digest]of Object.entries(acceptance.preservedStudy)){
  assert.ok(!name.startsWith('/')&&!name.split('/').includes('..'));
  assert.match(digest,/^[a-f0-9]{64}$/);
  assert.equal(sha(join(site,'adoquin',name)),digest,'Standalone study changed: '+name);
 }
}
