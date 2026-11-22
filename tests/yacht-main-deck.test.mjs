import test from 'node:test';
import assert from 'node:assert/strict';
import {mobile,full} from './yacht-guest-fixture.mjs';
import {travel} from './yacht-saloon-fixture.mjs';
import {mainRooms} from '../site/tidewater-rocha/mobile/main-deck.js';

const dining=[[6.7,0],[8.2,0],[8.2,-1.7],[8.3,-1.7],[8.3,-1.8],[11.2,-1.8],[11.2,-1.9],[17.2,-1.9],[17.2,0.1],[17.3,0.1],[17.3,0.2],[17.6,0.2],[17.6,1.8],[17.7,1.8],[17.7,1.9]];
const lobby=[...dining,[21.3,1.9],[21.3,1.5],[21.4,1.5],[21.4,1.4]];
const suiteDoor=[...lobby,[21.7,1.4],[21.7,0.5],[21.9,0.5],[21.9,0.4],[22.2,0.4],[22.2,0.3],[22.3,0.3],[22.3,0.2],[23.6,0.2]];
const destinations={
  MD_R09:[...lobby,[21.6,1.4],[21.6,0.9]],
  MD_R08:[...dining,[20.5,1.9],[20.5,2]],
  MD_R03:[...dining,[21.2,1.9],[21.2,-0.2]],
  MD_R06:[...lobby,[21.5,1.4],[21.5,-2.4]],
  MD_R04:[...suiteDoor,[23.6,-1.7],[24.8,-1.7],[24.8,-1.6],[24.9,-1.6],[24.9,-1.5],[25.8,-1.5],[25.8,-1.4]],
  MD_R05:[...suiteDoor,[23.6,1.7],[23.7,1.7],[23.7,1.8],[25.6,1.8],[25.6,1.7],[26.6,1.7],[26.6,1],[27,1],[27,0.5],[27.7,0.5],[27.7,1.5]],
  MD_R12:[...suiteDoor,[23.6,-1.7],[24.8,-1.7],[24.8,-1.6],[24.9,-1.6],[24.9,-1.5],[26,-1.5],[26,-1.4],[27,-1.4],[27,-0.6],[27.9,-0.6],[27.9,-1.9]],
  MD_R10:[[6.7,0],[5.6,0],[5.6,0.6],[5.3,0.6],[5.3,1],[5.1,1],[5.1,2.9],[5.3,2.9],[5.3,3],[11.3,3],[11.3,3.2],[11.5,3.2],[11.5,3.3],[20,3.3]],
  MD_R11:[[6.7,0],[8.2,0],[8.2,-1.7],[8.3,-1.7],[8.3,-3.2],[8.5,-3.2],[8.5,-3.3],[20,-3.3],[20,-3.4]],
};

test('the gangway joins the cockpit and all nine main deck destinations have return routes in both viewers',async()=>{
  for(const fixture of [mobile(),await full({boarding:true})]){
    const {model,walk:{nav}}=fixture;
    const boarding=[[-4.3,3.1],[2.1,3.1],[3.65,3.1],[4.56,3.1],[4.59,2.4],
      [4.59,1.21],[5.91,1.05],[6.11,.74],[6.13,.20],[6.68,0],[6.7,0]];
    const startHeight=model.boarding.height(-4.3);
    for(const hz of [12,40,60]){
      nav.deck='MD';nav.position=boarding[0].slice();nav.stair=null;nav.elevation=startHeight;
      travel(nav,boarding,hz);
      for(const [id,path] of Object.entries(destinations)){
        travel(nav,path,hz);
        assert.equal(nav.location()?.id,id);
        assert.equal(nav.elevation,3.95);
        nav.move(0,0);
        travel(nav,path.toReversed(),hz);
      }
      travel(nav,boarding.toReversed(),hz);
      assert.ok(Math.abs(nav.elevation-startHeight)<.001);
    }
    for(const room of mainRooms){
      const xy=room.spawn.slice(0,2);
      assert.ok(nav.floorSafe(...xy,'MD'),room.id);
      assert.deepEqual(nav.nearest(...xy,'MD'),xy);
      assert.equal(model.asset.data.rooms.filter(r=>r.id===room.id).length,1);
    }
    for(const p of [[21.95,.96],[24.7,0],[29.29,1.9],[20,3.83],[22.5,3.24]])
      assert.equal(nav.floorSafe(...p,'MD'),false,'Walk through fitting or edge '+p);
    fixture.dispose?.();if(!fixture.dispose)model.dispose();
  }
});
