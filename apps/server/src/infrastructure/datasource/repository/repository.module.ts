import {Module, Provider} from '@nestjs/common';
import {UserRepository, UserRepositoryMock} from './user.repository';
import {IUserRepository} from '../../../domain/models/user/user.repository.interface';
import {OrmModule} from '../orm/orm.module';
import {ISessionRepository} from '../../../domain/models/session/session.repository.interface';
import {SessionRepository, SessionRepositoryMock} from './session.repository';
import {IRoomRepository} from '../../../domain/models/room/room.repository.interface';
import {MockRoomRepository} from './room.repository';

const providers: Provider[] = [
    {
        provide : IUserRepository,
        useClass:
            process.env.NODE_ENV === 'testing'
                ? UserRepositoryMock
                : UserRepository,
    },
    {
        provide : ISessionRepository,
        useClass:
            process.env.NODE_ENV === 'testing'
                ? SessionRepositoryMock
                : SessionRepository,
    },
    {
        provide : IRoomRepository,
        useClass: MockRoomRepository, //fixme
    }
];
@Module({
    controllers: [],
    providers  : [...providers],
    imports    : [OrmModule],
    exports    : [IUserRepository, ISessionRepository, IRoomRepository]
})
export class RepositoryModule {}
