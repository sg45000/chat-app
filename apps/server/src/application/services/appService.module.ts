import {Module} from '@nestjs/common';
import {UserAppService} from './user.appservice';
import {DomainModelServiceModule} from '../../domain/domainModelService.module';

@Module({
    controllers: [],
    providers  : [UserAppService],
    imports    : [DomainModelServiceModule],
    exports    : [UserAppService],
})
export class AppServiceModule {}
