import {GraphQLClient} from 'graphql-request';
import {getSdk} from './types';

const createGraphqlClient = () => {
  const client = new GraphQLClient('http://localhost:3030/graphql'); //fixme 可変に
  return getSdk(client);
};

export type GraphqlClient = ReturnType<typeof createGraphqlClient>

export const gqlClientSdk = createGraphqlClient();
