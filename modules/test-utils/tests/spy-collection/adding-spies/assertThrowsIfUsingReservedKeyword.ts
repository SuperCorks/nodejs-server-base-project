import {expect} from "../../../functions";
import {spy, SpyCollection} from "../../../spies";

export function assertThrowsIfUsingReservedKeyword(addSpies: (spies: any) => SpyCollection) {

    for (let keyword of SpyCollection.ReservedKeywords) {

        expect(() => addSpies({[keyword]: spy()}),
            `Didn't throw when the spy name was '${keyword}'!`
        ).to.throw();
    }
}
