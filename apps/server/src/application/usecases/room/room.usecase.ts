import {Injectable} from '@nestjs/common';
import {IRoomRepository} from '../../../domain/models/room/room.repository.interface';
import {RoomModel} from '../../../domain/models/room/room.model';
import {EntityPId} from '../../../domain/models/common.value';

@Injectable()
export class RoomUsecase {
    constructor(
        private readonly roomRepository: IRoomRepository) {
    }

    /**
     * 全てのトークルームを取得する
     */
    async getAllRooms(): Promise<RoomModel[]> {
        const rooms = await this.roomRepository.findAll();
        return rooms;
    }

    async getRoomById(id: string): Promise<RoomModel | null> {
        return this.roomRepository.findOneById(EntityPId.reconstruct(id));
    }
}
