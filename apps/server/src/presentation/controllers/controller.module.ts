import {Module} from '@nestjs/common';
import {UserResolver} from './user/user.resolver';
import {AppServiceModule} from '../../application/services/appService.module';

@Module({
    providers  : [UserResolver],
    imports    : [AppServiceModule]
})
export class ControllerModule {}
