import {SpyCollection} from "../../../spies";
import {
    createTestObjectsAndSpies,
    expectToContainTestSpies,
    expectToContainTestStubs
} from "../spy-collection-tests-helpers";

export function assertSpiesAreAccessibleThroughTheIndexer(addSpies: (spies: any) => SpyCollection) {
    let {stubs, spies} = createTestObjectsAndSpies();

    let collection = addSpies({...stubs, ...spies});

    expectToContainTestStubs(collection);
    expectToContainTestSpies(collection);
}
