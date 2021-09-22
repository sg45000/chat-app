import {Module, Provider} from '@nestjs/common';
import {UserRepository, UserRepositoryMock} from './user.repository';
import {IUserRepository} from '../../../domain/models/user/user.repository.interface';
import {OrmModule} from '../orm/orm.module';

const providers: Provider[] = [
    {
        provide : IUserRepository,
        useClass:
            process.env.NODE_ENV === 'testing'
                ? UserRepositoryMock
                : UserRepository,
    },
];
@Module({
    controllers: [],
    providers  : [...providers],
    imports    : [OrmModule],
    exports    : [IUserRepository]
})
export class RepositoryModule {}
