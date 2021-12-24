import {RoomModel} from './room.model';
import {EntityPId} from '../common.value';

export abstract class IRoomRepository {
    abstract findAll(): Promise<RoomModel[]>
    abstract findOneById(id: EntityPId<RoomModel>): Promise<RoomModel | null>
}
