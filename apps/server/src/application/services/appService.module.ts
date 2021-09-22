import {Module} from '@nestjs/common';
import {UserAppService} from './user.appservice';
import {DomainModelServiceModule} from '../../domain/domainModelService.module';
import {RepositoryModule} from '../../infrastructure/datasource/repository/repository.module';

@Module({
    controllers: [],
    providers  : [UserAppService],
    imports    : [
        DomainModelServiceModule,
        RepositoryModule,
    ],
    exports: [UserAppService],
})
export class AppServiceModule {}
