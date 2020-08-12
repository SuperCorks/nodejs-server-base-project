import {
    createTestObjectsAndSpies, expectSpiesToBeRestored,
    expectStubbedBehavior, expectStubsToBeRestored,
    expectToHaveSpyProperties
} from "../spy-collection-tests-helpers";
import {SpyCollection} from "../../../spies";

export function assertRestoresSpies() {
    let {stubbed, spiedOn, stubs, spies} = createTestObjectsAndSpies();

    let collection = new SpyCollection({...stubs, ...spies});

    expectStubbedBehavior(stubbed);
    expectToHaveSpyProperties(spiedOn);

    collection.restore();

    expectStubsToBeRestored(stubbed);
    expectSpiesToBeRestored(spiedOn);
}
