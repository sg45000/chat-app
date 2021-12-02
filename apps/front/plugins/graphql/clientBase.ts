import {GraphQLClient} from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import {getSdk} from './types';
import {NG, OK, Result} from '~/types/types';

const createGraphqlClient = (client: GraphQLClient) => {
  return getSdk(client);
};

export type GraphqlClientSdk = ReturnType<typeof createGraphqlClient>

export abstract class GraphqlClientBase {
  protected readonly sdk: GraphqlClientSdk;
  protected constructor() {
    const client = new GraphQLClient('http://localhost:3030/graphql'); // fixme 可変に
    this.sdk = createGraphqlClient(client);
  }

  /**
   * リクエストを送る
   * @param method
   * @param props
   * @protected
   */
  protected async request<REQ,RES>(method: (req: REQ, headers: Dom.RequestInit['headers']) => Promise<RES>, props: REQ): Promise<Result<RES, Error>> {
    try{
      const result = await method(props, {
        Authorization: '' // fixme
      });
      return new OK(result);
    } catch (e) {
      return new NG(new Error('サーバーAPI実行時エラーが発生しました。'));
    }
  }
}
