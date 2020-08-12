import {BaseError} from "./base-error";

/** Base error for invalid argument values. */
export class ArgumentError extends BaseError{

    /**
     * @param argumentName - The name of the invalid argument argument.
     * @param reason - A full sentence that explains why its invalid.
     */
    constructor(argumentName: string, reason: string) {
        super(`Invalid argument ${argumentName}! ${reason}`);
    }
}
