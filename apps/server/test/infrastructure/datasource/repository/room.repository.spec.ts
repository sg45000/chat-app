import {PrismaClientService} from '../../../../src/infrastructure/datasource/orm/prisma-client.service';
import {RoomRepository} from '../../../../src/infrastructure/datasource/repository/room.repository';
import {v4 as UUID} from 'uuid';

describe('roomRepository', () => {
    let prismaClientService: PrismaClientService;
    let roomRepository: RoomRepository;
    const dummyData = [
        {
            id  : UUID(),
            name: 'ABCDEF',
        },
        {
            id  : UUID(),
            name: 'OOOPPP',
        },
        {
            id  : UUID(),
            name: 'MMMNNN',
        }
    ];

    beforeAll(async ()=> {
        prismaClientService = new PrismaClientService();
        await prismaClientService.room.deleteMany();
        await prismaClientService.room.createMany({data: dummyData});
        roomRepository = new RoomRepository(prismaClientService);
    });

    afterAll(async () => {
        await prismaClientService.room.deleteMany({
            where: {
                id: {
                    in: dummyData.map(d => d.id)
                }
            }
        });
    });

    it('findAll', async ()=>{
        const rooms = await roomRepository.findAll();
        expect(rooms.length).toBe(dummyData.length);
    });
});
