import {ISessionRepository} from '../../../domain/models/session/session.repository.interface';
import {SessionModel} from '../../../domain/models/session/session.model';
import {Injectable} from '@nestjs/common';
import {RedisClientService} from '../orm/redis-client.service';
import {EntityPId} from '../../../domain/models/common.value';

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
    async findOne(id: EntityPId<SessionModel>): Promise<SessionModel | null> {
        const response = await this.redisClientService.get(id.value);
        if(!response) {
            return null;
        }
        return SessionModel.reconstruct(id, EntityPId.reconstruct(response));
    }
}

@Injectable()
export class SessionRepositoryMock extends ISessionRepository {
    async create(session: SessionModel): Promise<void> {
        //fixme 未実装
        return new Promise(resolve => {
            throw new Error();
        });
    }

    async findOne(id: EntityPId<SessionModel>): Promise<SessionModel | null> {

        return new Promise((resolve)=>{
            resolve(SessionModel.reconstruct(id, EntityPId.create()));
        });
    }
}
