import {Module} from '@nestjs/common';
import {UserResolver} from './user/user.resolver';
import {AppServiceModule} from '../../application/services/appService.module';
import {GraphQLModule} from '@nestjs/graphql';
import {join} from 'path';

@Module({
    providers: [UserResolver],
    imports  : [
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile             : join(process.cwd(), '..', 'common', 'types', 'schema.graphql'),
        }),
        AppServiceModule,
    ]
})
export class ControllerModule {}
