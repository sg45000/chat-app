import {Module} from '@nestjs/common';
import {RepositoryModule} from '../../infrastructure/datasource/repository/repository.module';
import {AuthGuard} from './auth.guard';

@Module({
    controllers: [],
    providers  : [AuthGuard],
    imports    : [
        RepositoryModule,
    ],
    exports: [AuthGuard]
})
export class AuthModule {}
