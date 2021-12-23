import {Context} from '@nuxt/types';
import {GraphqlClientBase} from './clientBase';
import {
  GetPostsQueryResponse,
  GetRoomsQueryResponse,
  LoginMutationResponse,
  SignupMutationResponse
} from '~/plugins/graphql/response.types';

export class GraphqlClient extends GraphqlClientBase {
  constructor(protected readonly ctx: Context) {
    super(ctx);
  }

  /**
   * ログイン
   * @param mail
   * @param password
   */
  async login(mail: string, password: string): Promise<LoginMutationResponse | null> {
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
  async signup(firstname: string, lastname: string, mail: string, password: string): Promise<SignupMutationResponse | null> {
    const result = await this.request(this.sdk.signup, {firstname, lastname, mail, password});
    if(result.isFailure()) {
      return null;
    }
    return result.value.signup;
  }

  /**
   * 全トークルーム取得
   */
  async getRooms(): Promise<GetRoomsQueryResponse | Error> {
    const result = await this.request(this.sdk.getRooms, undefined);
    if(result.isFailure()) {
      return new Error('トークルームデータが取得できませんでした。');
    }
    return result.value.rooms;
  }

  /**
   * 最新の投稿を複数件取得
   */
  async getPosts(): Promise<GetPostsQueryResponse | Error> {
    const result = await this.request(this.sdk.getPosts, undefined);
    if(result.isFailure()) {
      return new Error('投稿データが取得できませんでした。');
    }
    return result.value.posts;
  }
}
