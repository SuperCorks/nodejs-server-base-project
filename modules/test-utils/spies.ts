import {IRestorable} from "./i-restorable";
import {spy, SinonSpy, SinonStub} from 'sinon';

export {spy};

export type SpyLike = SinonSpy|SinonStub|SpyCollection;

/** A composable collection of spies and stubs. */
export class SpyCollection implements Record<string, any>, IRestorable {

    public static readonly ReservedKeywords = ['add', 'restore'];

    constructor(spies?: Record<string, SpyLike>) {
        if (spies) this.add(spies);
    }

    [x: string]: any;

    add(spies: Record<string, SpyLike>): SpyCollection {

        for (let spyKey in spies) {

            if (SpyCollection.ReservedKeywords.includes(spyKey))
                throw new Error(`Cannot add spy named ${spyKey}! It could overwrite a method of this instance.`)

            if (this[spyKey]) throw new Error(`Spy/Stub ${spyKey} already exists!`);

            this[spyKey] = spies[spyKey];
        }
        return this;
    }

    restore() {
        for (let spyKey in this) {

            if (typeof(this[spyKey].restore) === 'function') {

                this[spyKey].restore();

                delete this[spyKey];
            } else if (this[spyKey].isSinonProxy) {
                delete this[spyKey];
            }
        }
    }
}
