import {Injectable} from '@nestjs/common';
import * as IORedis from 'ioredis';

@Injectable()
export class RedisClientService {
    private readonly client: IORedis.Redis;

    constructor() {
        this.client = new IORedis(process.env.REDIS_URL,{
            commandTimeout: 3 * 1000,
        }); // fixme configServiceで置き換え
    }

    /**
     * redisに値をセット
     * @param key
     * @param value
     * @param timeoutSec
     */
    async set(key: string, value: string | number, timeoutSec: number) {
        await this.client.set(key,value, 'ex', timeoutSec);
    }

    /**
     * redisから値を取得
     * @param key
     */
    async get(key: string) {
        return await this.client.get(key);
    }

    /**
     * redisのコネクションを閉じる
     */
    closeConnection(): void {
        this.client.disconnect();
    }
}
