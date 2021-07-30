import {Module, Provider} from '@nestjs/common';
import {UserRepository, UserRepositoryMock} from './user.repository';
import {IUserRepository} from '../../../domain/models/user/user.repository.interface';

const providers: Provider[] = [
    {
        provide : IUserRepository,
        useClass:
            process.env.NODE_ENV === 'development'
                ? UserRepositoryMock
                : UserRepository,
    },
];
@Module({
    controllers: [],
    providers  : [...providers],
    imports    : [],
    exports    : [IUserRepository]
})
export class RepositoryModule {}
