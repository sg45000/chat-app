import {Module} from '@nestjs/common';
import {UserUsecase} from './user/user.usecase';
import {DomainModelServiceModule} from '../../domain/domainModelService.module';
import {RepositoryModule} from '../../infrastructure/datasource/repository/repository.module';
import {RoomUsecase} from './room/room.usecase';

@Module({
    controllers: [],
    providers  : [
        UserUsecase,
        RoomUsecase,
    ],
    imports: [
        DomainModelServiceModule,
        RepositoryModule,
    ],
    exports: [
        UserUsecase,
        RoomUsecase
    ],
})
export class UsecaseModule {}
