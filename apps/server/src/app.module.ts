import {Module} from '@nestjs/common';
import {ControllerModule} from './presentation/controllers/controller.module';
import {AuthModule} from './presentation/authentication/auth.module';
import {LoggingPlugin} from './plugins/logging.plugin';

@Module({
    imports: [
        ControllerModule,
        AuthModule,
    ],
    controllers: [],
    providers  : [LoggingPlugin],
})
export class AppModule {}
