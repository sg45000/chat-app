import {GraphQLClient} from 'graphql-request';
import {NG, OK, Result} from '../../types/types';
import {getSdk} from './types';

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
  protected async request<REQ,RES>(method: (req: REQ) => Promise<RES>, props: REQ): Promise<Result<RES, Error>> {
    try{
      const result = await method(props);
      return new OK(result);
    } catch (e) {
      return new NG(new Error('サーバーAPI実行時エラーが発生しました。'));
    }
  }
}
