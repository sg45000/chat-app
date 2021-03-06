import {Module} from '@nestjs/common';
import {UserResolver} from './user/user.resolver';
import {UsecaseModule} from '../../application/usecases/usecase.module';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {RepositoryModule} from '../../infrastructure/datasource/repository/repository.module';
import {RoomResolver} from './room/room.resolver';
import {PostResolver} from './post/post.resolver';
import {GraphQLError, GraphQLFormattedError} from 'graphql';

@Module({
    providers: [UserResolver, RoomResolver, PostResolver],
    imports  : [
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile             : join(process.cwd(), '..', 'common', 'types', 'schema.graphql'),
            formatError                : (error: GraphQLError) => {
                const graphQLFormattedError: GraphQLFormattedError = {
                    message: error.message,
                };
                return graphQLFormattedError;
            },
        }),
        UsecaseModule,
        RepositoryModule
    ]
})
export class ControllerModule {}
