import {BaseError} from "../../base-error";
import {assert, expect} from "soulmate/test-utils";


describe('unit: errors/BaseError', () => {

    it(`should be an instance of Error`, assertInstanceOfErrorClass)
    it(`should contain the stack information of its innerError`, assertContainsInnerErrorStack)
});

function assertInstanceOfErrorClass() {

    assert(new BaseError() instanceof Error);
}

function assertContainsInnerErrorStack() {

    try { throw new Error(); }
    catch (innerError) {

        let baseError = new BaseError(undefined, innerError);

        expect(baseError.stack).to.exist;
        assert(baseError.stack!.includes(innerError.stack));
    }
}
