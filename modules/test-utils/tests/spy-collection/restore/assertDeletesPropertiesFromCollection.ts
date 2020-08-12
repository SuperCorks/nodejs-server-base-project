import {SpyCollection} from "../../../spies";
import {createTestObjectsAndSpies, notDefaultProperty} from "../spy-collection-tests-helpers";

export function assertDeletesPropertiesFromCollection() {

    let {stubs, spies} = createTestObjectsAndSpies();

    let collection = new SpyCollection({...stubs,...spies});

    collection.restore();

    Object.values(collection)
        .filter(notDefaultProperty)
        .length
        .should.equal(0);
}
