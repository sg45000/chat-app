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

    /**
     * IDをキーに1件取得する
     * @param id
     */
    findOneById = async(id: EntityPId<RoomModel>): Promise<RoomModel> => {
        // fixme
        throw Error();
    }
}

@Injectable()
export class RoomRepositoryMock extends IRoomRepository {
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

    /**
     * IDをキーに1件取得する
     * @param id
     */
    findOneById = async(id: EntityPId<RoomModel>): Promise<RoomModel | null> => {
        return new Promise<RoomModel | null>((resolve) =>{
            resolve(this.inMemoryRecords.find(r => r.id.equals(id)) || null);
        });
    }
}
