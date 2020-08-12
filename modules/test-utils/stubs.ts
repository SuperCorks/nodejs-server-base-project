import {stub, SinonStub} from 'sinon';
import {SpyCollection} from "./spies";
import {IRestorable} from "./i-restorable";

export {stub};

/** Alias of SpyCollection. */
export class StubCollection extends SpyCollection {}

export function overwriteConfigs<T>(configsObject: T, newValues: Partial<T>): SinonStub[]&IRestorable{

    let stubs = stubAllKeys(configsObject, newValues);

    return decorateStubArray(stubs);
}

function stubAllKeys<T>(configsObject: T, newValues: Partial<T>): SinonStub[] {

    let stubs: SinonStub[] = [];

    for (let key in newValues){
        stubs.push(stub(configsObject, key).value(newValues[key]));
    }

    return stubs;
}

function decorateStubArray(stubArray: SinonStub[]): SinonStub[]&IRestorable {

    let decoratedStubArray = stubArray as SinonStub[]&IRestorable;

    decoratedStubArray.restore = () => {
        for (let stub of stubArray) {
            if (typeof stub.restore === "function") stub.restore();
        }
    };

    return decoratedStubArray;
}
