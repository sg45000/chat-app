export abstract class CustomError extends Error {
    protected abstract type: string;
    protected constructor(message: string) {
        super(message);
    }
}

export class IllegalArgumentException extends CustomError {
    protected readonly type = 'IllegalArgumentException'
    constructor(message: string) {
        super(message);
        console.error(message); // fixme ロガー
    }
}

export class MutationException extends CustomError {
    protected readonly type = 'MutationException'
    constructor(message: string) {
        super(message);
        console.error(message); // fixme ロガー
    }
}

export class DbInsertException extends CustomError {
    protected readonly type = 'DbInsertException'
    constructor(message: string) {
        super(message);
        console.error(message); // fixme ロガー
    }
}
