import {RoomModel, RoomModelArgs} from '../../../src/domain/models/room/room.model';
import {UserModel, UserModelArgs} from '../../../src/domain/models/user/user.model';

let users: UserModel[];
beforeEach(() =>{
    const newUsers: UserModel[] = [];
    for (let i = 0; i < 10; i++) {
        const args: UserModelArgs = {
            firstName     : `太郎${i}`,
            lastName      : '田中',
            mail          : `abcdef-3897ryhiuw${i}@gmail.com`,
            hashedPassWord: 'tnajrnejaf3r4et',
        };
        const user = UserModel.create(args);
        newUsers.push(user);
    }

    users = newUsers;
});

describe('RoomModelTest', ()=>{
    it('トークルームにメンバーを追加する', ()=>{
        const args: RoomModelArgs = {
            name: 'チャットルーム'
        };
        const room = RoomModel.create(args);
        for (let i = 0; i <= room.MAX_NUM_MEMBERS; i++) {
            const result = room.addMember(users[i]);
            if(i < room.MAX_NUM_MEMBERS) {
                expect(result.isSuccess()).toBe(true);
            } else {
                expect(result.isFailure()).toBe(true);
            }
        }
    });
});
