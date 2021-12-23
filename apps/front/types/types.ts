export class OK<T, E> {

  constructor(readonly value: T) {}

  private readonly type = 'success' as const;
  isSuccess(): this is OK<T, E> {
    return true;
  }

  isFailure(): this is NG<T, E> {
    return false;
  }
}

export class NG<T, E> {
  constructor(readonly value: E) {}
  private readonly type = 'failure' as const;
  isSuccess(): this is OK<T, E> {
    return false;
  }

  isFailure(): this is NG<T, E> {
    return true;
  }
}
export type Result<T, E> = OK<T, E> | NG<T, E>;
