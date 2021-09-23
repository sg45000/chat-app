import {Injectable} from '@nestjs/common';
import * as IORedis from 'ioredis';

@Injectable()
export class RedisClientService {
    private readonly client: IORedis.Redis;

    constructor() {
        this.client = new IORedis({
            port: 6379,
            host: 'localhost',
        }); // fixme configServiceで置き換え
    }

    /**
     * redisに値をセット
     * @param key
     * @param value
     */
    async set(key: string, value: string | number) {
        await this.client.set(key,value);
    }

    /**
     * redisから値を取得
     * @param key
     */
    async get(key: string) {
        return await this.client.get(key);
    }

}
