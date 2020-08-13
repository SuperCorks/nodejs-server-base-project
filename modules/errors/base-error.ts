export class BaseError extends Error {

    public readonly name: string;

    constructor(public readonly reason?: string, public readonly innerError?: Error) {
        super(reason);

        // https://stackoverflow.com/a/48342359/11761124
        // The problem is that Javascript's built-in class Error breaks the prototype chain by switching the
        // object to be constructed (i.e. this) to a new, different object, when you call super and that new object
        // doesn't have the expected prototype chain. For this reason, this cannot be extracted into a class function.
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = this.constructor.name;

        this.includeInnerErrorInStackTrace();
    }

    private includeInnerErrorInStackTrace() {
        if (this.innerError) this.stack +=
            `\nINNER ERROR ----------------------------------------------\n` +
            `${this.innerError.stack}`;
    }
}
