import {
    createTestObjectsAndSpies,
    expectSpiesToBeRestored,
    expectStubsToBeRestored
} from "../spy-collection-tests-helpers";
import {SpyCollection} from "../../../spies";

export function assertRestoresNestedSpies() {
    let {stubbed, spiedOn, stubs, spies} = createTestObjectsAndSpies();

    let collection = new SpyCollection({
        nested: new SpyCollection({...stubs, ...spies})
    })

    collection.restore();

    expectStubsToBeRestored(stubbed);
    expectSpiesToBeRestored(spiedOn);
}
