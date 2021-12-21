import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ControllerModule} from './presentation/controllers/controller.module';
import {AuthModule} from './presentation/authentication/auth.module';
import {LoggingPlugin} from './plugins/logging.plugin';

@Module({
    imports: [
        ControllerModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers  : [AppService, LoggingPlugin],
})
export class AppModule {}
