import {SpyCollection, SpyLike} from "../../spies";
import {assertRestoresSpies} from "./restore/assertRestoresSpies";
import {assertRestoresNestedSpies} from "./restore/assertRestoresNestedSpies";
import {assertThrowsIfUsingReservedKeyword} from "./adding-spies/assertThrowsIfUsingReservedKeyword";
import {assertDeletesPropertiesFromCollection} from "./restore/assertDeletesPropertiesFromCollection";
import {assertSpiesAreAccessibleThroughTheIndexer} from "./adding-spies/assertSpiesAreAccessibleThroughTheIndexer";

describe('unit: test-utils/spies/SpyCollection', () => {

    let waysToAddSpies = [
        {description: 'with constructor()', addSpies: addSpyWithConstructor},
        {description: 'with add() method', addSpies: addSpyWithAddMethod},
    ];

    for (let strategy of waysToAddSpies) {

        context(`adding spies ${strategy.description}`, () => {

            it('should make the spies accessible through the indexer', () => assertSpiesAreAccessibleThroughTheIndexer(strategy.addSpies));
            it('should throws if using a reserved keyword', () => assertThrowsIfUsingReservedKeyword(strategy.addSpies));
        });
    }

    context('restore()', () => {

        it('should restore the spies', assertRestoresSpies);
        it(`should delete the properties from the collection's index`, assertDeletesPropertiesFromCollection);
        it(`should restore nested spies`, assertRestoresNestedSpies);
    });
});

function addSpyWithConstructor(spies: Record<string, SpyLike>): SpyCollection {
    return new SpyCollection(spies);
}
function addSpyWithAddMethod(spies: Record<string, SpyLike>): SpyCollection {
    return new SpyCollection().add(spies);
}
