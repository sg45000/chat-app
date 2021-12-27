import {PrismaClient} from '@prisma/client';
import {UserSeed} from './user.seed';
import {RoomSeed} from './room.seed';

const prisma = new PrismaClient();

const transfer = async () => {
    const userSeed = new UserSeed(prisma);
    const roomSeed = new RoomSeed(prisma);
    await prisma.$transaction([...userSeed.transfer(), ...roomSeed.transfer()]);
};

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
    console.log('Start seeding ...');

    await transfer();

    console.log('Seeding finished.');
};

// 処理開始
void main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
