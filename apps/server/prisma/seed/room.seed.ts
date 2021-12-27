import {PrismaClient} from '@prisma/client';
import {RoomModel, RoomModelArgs} from '../../src/domain/models/room/room.model';

export class RoomSeed {
    constructor(private prisma: PrismaClient) {
    }

    createModelArgs: RoomModelArgs[] = [
        {
            name: 'トークルーム1'
        },
        {
            name: 'トークルーム2',
        },
        {
            name: 'トークルーム3',
        }
    ]

    transfer = () => {
        const rooms: RoomModel[] = this.createModelArgs.map(a => RoomModel.create(a));
        return rooms.map(u =>
            this.prisma.room.create({
                data: {
                    id  : u.id.value,
                    name: u.name.value,
                },
            })
        );
    }
}
