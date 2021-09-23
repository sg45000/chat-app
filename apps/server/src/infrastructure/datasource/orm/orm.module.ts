import {Module} from '@nestjs/common';
import {PrismaClientService} from './prisma-client.service';
import {RedisClientService} from './redis-client.service';

@Module({
    controllers: [],
    providers  : [PrismaClientService, RedisClientService],
    imports    : [],
    exports    : [PrismaClientService, RedisClientService]
})
export class OrmModule {}
