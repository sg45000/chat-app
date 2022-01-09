import {Context} from '@nuxt/types';
import {GraphqlClientBase} from './clientBase';
import {
  GetPostsQueryResponse,
  GetRoomsQueryResponse,
  LoginMutationResponse,
  SignupMutationResponse
} from '~/plugins/graphql/response.types';
import {NG, OK, Result} from '~/types/types';

export class GraphqlClient extends GraphqlClientBase {
  constructor(protected readonly ctx: Context) {
    super(ctx);
  }

  /**
   * ログイン
   * @param mail
   * @param password
   */
  async login(mail: string, password: string): Promise<Result<LoginMutationResponse, Error>> {
    const response = await this.request(this.sdk.login, {mail, password});
    if(response instanceof Error) {
      return new NG(response);
    }
    return new OK(response.login);
  }

  /**
   * ユーザー登録
   * @param firstname
   * @param lastname
   * @param mail
   * @param password
   */
  async signup(firstname: string, lastname: string, mail: string, password: string): Promise<Result<SignupMutationResponse, Error>> {
    const response = await this.request(this.sdk.signup, {firstname, lastname, mail, password});
    if(response instanceof Error) {
      return new NG(response);
    }
    return new OK(response.signup);
  }

  /**
   * 全トークルーム取得
   */
  async getRooms(): Promise<Result<GetRoomsQueryResponse[], Error>> {
    const response = await this.request(this.sdk.getRooms, undefined);
    if(response instanceof Error) {
      return new NG(response);
    }
    return new OK(response.rooms);
  }

  /**
   * 最新の投稿を複数件取得
   */
  async getPosts(): Promise<Result<GetPostsQueryResponse[], Error>> {
    const response = await this.request(this.sdk.getPosts, undefined);
    if(response instanceof Error) {
      return new NG(response);
    }
    return new OK(response.posts);
  }
}
