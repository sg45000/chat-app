export interface UserCreateCommand {
    readonly mail: string;
    readonly lastName: string;
    readonly firstName: string;
    readonly password: string;
}

export interface SessionCreateCommand {
    readonly mail: string;
    readonly password: string;
}
