import {Injectable} from '@nestjs/common';
import {IRoomRepository} from '../../../domain/models/room/room.repository.interface';
import {RoomModel} from '../../../domain/models/room/room.model';
import {PrismaClientService} from '../orm/prisma-client.service';
import {EntityPId} from '../../../domain/models/common.value';

@Injectable()
export class RoomRepository extends IRoomRepository {
    constructor(
        private readonly prismaClientService: PrismaClientService
    ) {
        super();
    }


    /**
     * トークルームを全て取得する
     */
    async findAll(): Promise<RoomModel[]> {
        const rooms = await this.prismaClientService.room.findMany();
        return rooms.map(r => RoomModel.reconstruct(
            {name: r.name},
            EntityPId.reconstruct(r.id)
        ));
    }
}

@Injectable()
export class MockRoomRepository extends IRoomRepository {
    inMemoryRecords: RoomModel[] = [];
    constructor() {
        super();
        this.inMemoryRecords.push(
            RoomModel.create({name: 'トークルーム1'}),
            RoomModel.create({name: 'トークルーム2'}),
            RoomModel.create({name: 'トークルーム3'}),
            
        );
    }
    /**
     * トークルームを全て取得する
     */
    findAll(): Promise<RoomModel[]> {
        return new Promise<RoomModel[]>((resolve)=>{
            resolve(this.inMemoryRecords);
        });
    }
}
