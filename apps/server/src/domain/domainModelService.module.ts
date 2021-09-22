import {Module} from '@nestjs/common';
import {UserService} from './models/user/user.service';
import {RepositoryModule} from '../infrastructure/datasource/repository/repository.module';

@Module({
    controllers: [],
    providers  : [UserService],
    imports    : [RepositoryModule],
    exports    : [UserService],
})
export class DomainModelServiceModule {}
