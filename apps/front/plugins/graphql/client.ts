import {Context} from '@nuxt/types';
import {GraphqlClientBase} from './clientBase';
import {GetRoomsQuery, LoginMutation} from './types';

export class GraphqlClient extends GraphqlClientBase {
  constructor(readonly ctx: Context) {
    super();
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
