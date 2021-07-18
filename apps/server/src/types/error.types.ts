export class CustomError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class IncompatibleValueError extends CustomError {
    constructor(message: string) {
        super(message);
        console.error(message); // fixme ロガー
    }
}
