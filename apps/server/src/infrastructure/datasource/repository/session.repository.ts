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
    async create(session: SessionModel): Promise<SessionModel> {
        try {
            await this.redisClientService.set(session.user.id.value, session.id.value, 120 * 60);
        } catch (e) {
            throw new Error();
        }
        return session;
    }
}

@Injectable()
export class SessionRepositoryMock extends ISessionRepository {
    async create(session: SessionModel): Promise<SessionModel> {
        return new Promise((resolve)=>{
            resolve(session);
        });
    }
}
