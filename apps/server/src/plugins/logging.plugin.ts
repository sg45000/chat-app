import {Plugin} from '@nestjs/graphql';
import {ApolloServerPlugin, GraphQLRequestListener} from 'apollo-server-plugin-base';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
    requestDidStart(): GraphQLRequestListener {
        return {
            executionDidStart(context) {
                if(context.request.operationName !== 'IntrospectionQuery') {
                    console.log(`query... ${context.request.query ?? ''}`); // fixme ロガー使う
                }
            },
            willSendResponse(context) {
                if(context.request.operationName !== 'IntrospectionQuery') {
                    console.log(`response date ... ${JSON.stringify(context.response.data) ?? ''}`); // fixme ロガー使う
                }
            },
        };
    }
}
