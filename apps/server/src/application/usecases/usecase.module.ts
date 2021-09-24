import {Module} from '@nestjs/common';
import {UserUsecase} from './user/user.usecase';
import {DomainModelServiceModule} from '../../domain/domainModelService.module';
import {RepositoryModule} from '../../infrastructure/datasource/repository/repository.module';

@Module({
    controllers: [],
    providers  : [UserUsecase],
    imports    : [
        DomainModelServiceModule,
        RepositoryModule,
    ],
    exports: [UserUsecase],
})
export class UsecaseModule {}
