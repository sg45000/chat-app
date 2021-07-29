import {Module} from '@nestjs/common';
import {UserService} from './models/user/user.service';

@Module({
    controllers: [],
    providers  : [UserService],
    imports    : [],
    exports    : [UserService],
})
export class DomainModelServiceModule {}
