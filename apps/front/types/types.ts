export interface Post {
  msg: string;
  postAt: Date;
  isMine: boolean;
}

export class Result<T> {
  readonly ok: boolean;
  readonly message: string;
  readonly data: T;

  constructor(ok: boolean, message: string, data: T) {
    this.ok = ok;
    this.message = message;
    this.data = data;
  }

}
