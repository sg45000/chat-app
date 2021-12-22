import {Module, Provider, Type} from '@nestjs/common';
import {UserRepository, UserRepositoryMock} from './user.repository';
import {IUserRepository} from '../../../domain/models/user/user.repository.interface';
import {OrmModule} from '../orm/orm.module';
import {ISessionRepository} from '../../../domain/models/session/session.repository.interface';
import {SessionRepository, SessionRepositoryMock} from './session.repository';
import {IRoomRepository} from '../../../domain/models/room/room.repository.interface';
import {MockRoomRepository} from './room.repository';
import {IPostRepository} from '../../../domain/models/post/post.repository.interface';
import {MockPostRepository} from './post.repository';

const providers: Provider[] = [
    {
        provide : IUserRepository,
        useClass:
            isMocking()
                ? UserRepositoryMock
                : UserRepository,
    },
    {
        provide : ISessionRepository,
        useClass:
            isMocking()
                ? SessionRepositoryMock
                : SessionRepository,
    },
    {
        provide : IRoomRepository,
        useClass: MockRoomRepository, //fixme
    },
    {
        provide : IPostRepository,
        useClass: MockPostRepository, //fixme
    }
];
@Module({
    controllers: [],
    providers  : [...providers],
    imports    : resolveImports(),
    exports    : [IUserRepository, ISessionRepository, IRoomRepository, IPostRepository]
})
export class RepositoryModule {}

function resolveImports(): Type[] {
    return isMocking() ? [] : [OrmModule];
}

function isMocking(): boolean {
    return process.env.USE_MOCK === 'true';
}
