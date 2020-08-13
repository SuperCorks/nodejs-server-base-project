import {BaseError} from "../../base-error";
const {assert, expect} = require("soulmate/test-utils");

describe('unit: errors/BaseError', () => {

    it(`should be an instance of Error`, assertInstanceOfErrorClass);
    it(`should contain the stack information of its innerError`, assertContainsInnerInErrorStack);
    it(`should identify child classes as instances of BaseError in a catch clause`, assertChildClassInstanceOfBaseError)
    it(`should conserve the methods of the child classes`, assertConservesChildMethods)
});

class ChildError extends BaseError {
    childMethod() {}
}
class GrandChildError extends ChildError {
    grandChildMethod() {}
}

function assertInstanceOfErrorClass() {
    assertInstanceOfInCatch(BaseError, Error);
}

function assertContainsInnerInErrorStack() {

    try { throw new Error(); }
    catch (innerError) {

        let baseError = new BaseError(undefined, innerError);

        expect(baseError.stack).to.exist;
        assert(baseError.stack!.includes(innerError.stack));
    }
}


function assertChildClassInstanceOfBaseError() {

    assertInstanceOfInCatch(ChildError, BaseError);
    assertInstanceOfInCatch(ChildError, ChildError);
}

function assertInstanceOfInCatch(errorToThrow: new () => BaseError, expectedErrorClass: new () => Error) {
    try { throw new errorToThrow(); }
    catch (caughtError) {
        assert(caughtError instanceof expectedErrorClass,
            `${errorToThrow.name} is not an instance of ${expectedErrorClass.name} in a catch clause!`);
    }
}

function assertConservesChildMethods() {
    let error = new GrandChildError();
    expect(error.childMethod).to.exist;
    expect(error.grandChildMethod).to.exist;
}
