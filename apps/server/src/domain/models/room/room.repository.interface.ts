import {RoomModel} from './room.model';

export abstract class IRoomRepository {
    abstract findAll(): Promise<RoomModel[]>
}
