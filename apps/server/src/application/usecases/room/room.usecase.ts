import {Injectable} from '@nestjs/common';
import {IRoomRepository} from '../../../domain/models/room/room.repository.interface';
import {RoomModel} from '../../../domain/models/room/room.model';

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
}
