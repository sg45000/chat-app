import {Module} from '@nestjs/common';
import {UserResolver} from './user/user.resolver';
import {AppServiceModule} from '../../application/services/appService.module';
import {GraphQLModule} from '@nestjs/graphql';

@Module({
    providers  : [UserResolver],
    imports    : [
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: 'schema.graphql',
        }),
        AppServiceModule,
    ]
})
export class ControllerModule {}
