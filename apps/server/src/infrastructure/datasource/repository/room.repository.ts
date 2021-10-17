import {Injectable} from '@nestjs/common';
import {IRoomRepository} from '../../../domain/models/room/room.repository.interface';
import {RoomModel} from '../../../domain/models/room/room.model';

@Injectable()
export class MockRoomRepository extends IRoomRepository {
    /**
     * トークルームを全て取得する
     */
    findAll(): Promise<RoomModel[]> {
        return new Promise<RoomModel[]>((resolve)=>{
            resolve([RoomModel.create({name: 'トークルーム1'})]);
        });
    }
}
