import {PrismaClient} from '@prisma/client';
import {UserModel, UserModelArgs} from '../../src/domain/models/user/user.model';
import {UserHashedPass} from '../../src/domain/models/user/user.value';

export class UserSeed {
    constructor(private prisma: PrismaClient) {
    }
    
    createModelArgs: UserModelArgs[] = [
        {
            firstName     : '太郎',
            lastName      : '田中',
            mail          : 'tanaka@gmail.sample.com',
            hashedPassWord: UserHashedPass.toHash('test1111'),
        },
        {
            firstName     : '恵美',
            lastName      : '高田',
            mail          : 'takada@gmail.sample.com',
            hashedPassWord: UserHashedPass.toHash('test1111'),
        },
        {
            firstName     : '優',
            lastName      : '野口',
            mail          : 'noguchi@gmail.sample.com',
            hashedPassWord: UserHashedPass.toHash('test1111'),
        },
        {
            firstName     : '萌子',
            lastName      : '鳥山',
            mail          : 'toriyama@gmail.sample.com',
            hashedPassWord: UserHashedPass.toHash('test1111'),
        },
        {
            firstName     : '絵美',
            lastName      : '河合',
            mail          : 'kawai@gmail.sample.com',
            hashedPassWord: UserHashedPass.toHash('test1111'),
        }
    ]
    
    transfer = () => {
        const users: UserModel[] = this.createModelArgs.map(a => UserModel.create(a));
        return users.map(u =>
            this.prisma.user.create({
                data: {
                    id       : u.id.value,
                    firstName: u.name.value.firstName,
                    lastName : u.name.value.lastName,
                    mail     : u.mail.value,
                    hashedPw : u.hashedPassWord.value
                },
            })
        );
    }
}
