import {RedisClientService} from '../../../src/infrastructure/datasource/orm/redis-client.service';
import {MyUtil} from '../../../src/utils/my.util';

let redisClient: RedisClientService;
beforeAll(() => {
    redisClient = new RedisClientService();
});

describe('redis data access check.',   () => {
    test('redisにセットした値が取得した値と同じか',async () => {
        const key = 'abc';
        const value = '123';
        await redisClient.set(key, value, 1);
        const res = await redisClient.get(key);
        expect(value).toBe(res);
    });

    test('redisにセットした値が指定時間で削除されるか',async () => {
        const key = 'abc';
        const value = '123';
        await redisClient.set(key, value, 2);
        await MyUtil.sleep(3);
        const res = await redisClient.get(key);
        expect(res).toBe(null);
    });
});
