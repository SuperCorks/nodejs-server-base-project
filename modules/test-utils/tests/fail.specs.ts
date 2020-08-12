import {AssertionError} from 'chai';
import {Maybe} from "../../types/maybe";
import { fail, expect } from "../functions";

describe(`unit: test-utils/functions/fail()`, () => {

    it(`should throw an AssertionError when no arg is provided`, assertThrowsNoArgument());
    it(`should throw an AssertionError when arg is null`, assertThrowsWith(null));
    it(`should throw an AssertionError when arg is undefined`, assertThrowsWith(undefined));
    it(`should throw an AssertionError when arg is an error`, assertThrowsWith(new Error()));
    it(`should throw an AssertionError when arg is a string`, assertThrowsWith('error message'));

    function assertThrowsNoArgument() {
        return () => expect(() => fail()).to.throw(AssertionError)
    }

    function assertThrowsWith(failArgument: Maybe<string|Error>) {
        return () => expect(() => fail(failArgument)).to.throw(AssertionError)
    }
});
