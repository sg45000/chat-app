import {ISessionRepository} from '../../../domain/models/session/session.repository.interface';
import {SessionModel} from '../../../domain/models/session/session.model';
import {Injectable} from '@nestjs/common';
import {RedisClientService} from '../orm/redis-client.service';

@Injectable()
export class SessionRepository extends ISessionRepository {
    constructor(
        private readonly redisClientService: RedisClientService
    ) {
        super();
    }
    async create(session: SessionModel): Promise<void> {
        try {
            await this.redisClientService.set(session.id.value, session.userId.value, 120 * 60);
        } catch (e) {
            throw new Error();
        }
    }
}

@Injectable()
export class SessionRepositoryMock extends ISessionRepository {
    async create(session: SessionModel): Promise<void> {
    }
}
