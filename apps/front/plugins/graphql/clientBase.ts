import {ClientError, GraphQLClient} from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import {Context} from '@nuxt/types';
import {getSdk} from './types';

const createGraphqlClient = (client: GraphQLClient) => {
  return getSdk(client);
};

export type GraphqlClientSdk = ReturnType<typeof createGraphqlClient>

export abstract class GraphqlClientBase {
  protected readonly sdk: GraphqlClientSdk;
  protected constructor(protected readonly ctx: Context) {
    const client = new GraphQLClient(ctx.$config.graphqlBaseUrl);
    this.sdk = createGraphqlClient(client);
  }

  /**
   * リクエストを送る
   * @param method
   * @param props
   * @protected
   */
  protected async request<REQ,RES>(method: (req: REQ, headers: Dom.RequestInit['headers']) => Promise<RES>, props: REQ): Promise<RES | Error> {
    try{
      const result = await method(props, {
        Authorization: this.ctx.app.$accessor.auth.bearerToken,
      });
      console.log(result);
      return result;
    } catch (e) {
      const error = e as ClientError;
      console.error(error);
      return new Error(error.response.errors?.map(err => err.message).join('\n') || 'サーバーAPI実行時エラーが発生しました。');
    }
  }
}
