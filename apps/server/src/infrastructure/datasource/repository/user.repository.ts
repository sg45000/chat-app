import {IUserRepository} from '../../../domain/models/user/user.repository.interface';
import {UserModel} from '../../../domain/models/user/user.model';
import {Injectable} from '@nestjs/common';
import {PrismaClientService} from '../orm/prisma-client.service';
import {UserMail} from '../../../domain/models/user/user.value';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        private readonly prismaClientService: PrismaClientService,
    ) {
    }
    async create(user: UserModel): Promise<UserModel> {
        const userEntity = await this.prismaClientService.user.create({
            data: {
                name: user.name.value,
                mail: user.mail.value,
                hashedPw: user.hashedPassWord.value,
            }
        });
        return UserModel.create({
            name: userEntity.name,
            mail: userEntity.mail,
            hashedPassWord: userEntity.hashedPw,
        });
    }

    async findOneByMail(mail: UserMail): Promise<UserModel> {
        const userEntity = await this.prismaClientService.user.findFirst({
            where: {
                mail: mail.value,
            }
        });
        return UserModel.create({
            name: userEntity.name,
            mail: userEntity.mail,
            hashedPassWord: userEntity.hashedPw,
        });
    }

}

@Injectable()
export class UserRepositoryMock implements IUserRepository {
    async create(user: UserModel): Promise<UserModel> {
        return new Promise((resolve, reject)=>{
            resolve(user);
        })
    }

    async findOneByMail(mail: UserMail): Promise<UserModel> {
        return new Promise((resolve, reject)=>{
            resolve(
                UserModel.create({
                    name: 'あああ　いいい',
                    mail: mail.value,
                    hashedPassWord: 'bafeuiiuewf4hnea',
                })
            );
        })
    }
}
