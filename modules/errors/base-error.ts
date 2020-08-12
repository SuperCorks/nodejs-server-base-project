
export class BaseError extends Error {

    public readonly name: string;

    constructor(public readonly reason?: string, public readonly innerError?: Error) {
        super(reason);

        this.name = this.constructor.name;

        if (innerError) this.stack +=
            `\nINNER ERROR ----------------------------------------------\n`+
            `${innerError.stack}`;
    }

}
