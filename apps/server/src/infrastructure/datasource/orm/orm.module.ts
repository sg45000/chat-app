import {Module} from '@nestjs/common';
import {PrismaClientService} from './prisma-client.service';

@Module({
    controllers: [],
    providers  : [PrismaClientService],
    imports    : [],
    exports    : [PrismaClientService]
})
export class OrmModule {}
