import {Context} from '@nuxt/types';
import {GraphqlClientBase} from './clientBase';
import {GetRoomsQuery, LoginMutation, SignupMutation} from './types';

export class GraphqlClient extends GraphqlClientBase {
  constructor(protected readonly ctx: Context) {
    super(ctx);
  }

  /**
   * ログイン
   * @param mail
   * @param password
   */
  async login(mail: string, password: string): Promise<LoginMutation['login'] | null> {
    const result = await this.request(this.sdk.login, {mail, password});
    if(result.isFailure()) {
      return null;
    }
    return result.value.login;
  }

  /**
   * ユーザー登録
   * @param firstname
   * @param lastname
   * @param mail
   * @param password
   */
  async signup(firstname: string, lastname: string, mail: string, password: string): Promise<SignupMutation['signup'] | null> {
    const result = await this.request(this.sdk.signup, {firstname, lastname, mail, password});
    if(result.isFailure()) {
      return null;
    }
    return result.value.signup;
  }

  /**
   * 全トークルーム取得
   */
  async getRooms(): Promise<GetRoomsQuery['rooms'] | Error> {
    const result = await this.request(this.sdk.getRooms, undefined);
    if(result.isFailure()) {
      return new Error('トークルームデータが取得できませんでした。');
    }
    return result.value.rooms;
  }
}
