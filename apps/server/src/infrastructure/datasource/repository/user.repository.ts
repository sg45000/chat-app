import {IUserRepository} from '../../../domain/models/user/user.repository.interface';
import {UserModel} from '../../../domain/models/user/user.model';
import {Injectable} from '@nestjs/common';
import {PrismaClientService} from '../orm/prisma-client.service';
import {UserMail} from '../../../domain/models/user/user.value';
import {v4 as UUID} from 'uuid';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        private readonly prismaClientService: PrismaClientService
    ) {}


    async create(user: UserModel): Promise<UserModel> {
        const userEntity = await this.prismaClientService.user.create({
            data: {
                firstName: user.name.value.firstName,
                lastName : user.name.value.lastName,
                mail     : user.mail.value,
                hashedPw : user.hashedPassWord.value,
            },
        });
        return UserModel.create(
            {
                id            : userEntity.id,
                firstName     : userEntity.firstName,
                lastName      : userEntity.lastName,
                mail          : userEntity.mail,
                hashedPassWord: userEntity.hashedPw,
            }
        );
    }

    async findOneByMail(mail: UserMail): Promise<UserModel | null> {
        const userEntity = await this.prismaClientService.user.findFirst({
            where: {
                mail: mail.value,
            },
        });
        if (!userEntity) {
            return null;
        }
        return UserModel.create(
            {
                id            : userEntity.id,
                firstName     : userEntity.firstName,
                lastName      : userEntity.lastName,
                mail          : userEntity.mail,
                hashedPassWord: userEntity.hashedPw,
            },

        );
    }
}

@Injectable()
export class UserRepositoryMock implements IUserRepository {
    async create(user: UserModel): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            resolve(user);
        });
    }

    async findOneByMail(mail: UserMail): Promise<UserModel | null> {
        return new Promise((resolve, reject) => {
            resolve(
                UserModel.create(
                    {
                        id            : UUID(),
                        firstName     : 'あああ',
                        lastName      : 'いいい',
                        mail          : 'sample@googlea.com',
                        hashedPassWord: 'sdfghjk',
                    })
            );
        });
    }
}
