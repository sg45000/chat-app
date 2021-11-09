import {Context} from '@nuxt/types';
import {GraphqlClientBase} from './clientBase';
import {LoginMutation} from './types';

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
}
