import {Module} from '@nestjs/common';
import {UserResolver} from './user/user.resolver';
import {UsecaseModule} from '../../application/usecases/usecase.module';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';
import {RepositoryModule} from '../../infrastructure/datasource/repository/repository.module';
import {RoomResolver} from './room/room.resolver';

@Module({
    providers: [UserResolver, RoomResolver],
    imports  : [
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile             : join(process.cwd(), '..', 'common', 'types', 'schema.graphql'),
        }),
        UsecaseModule,
        RepositoryModule
    ]
})
export class ControllerModule {}
