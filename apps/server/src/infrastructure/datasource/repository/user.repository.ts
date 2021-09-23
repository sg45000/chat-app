import {IUserRepository} from '../../../domain/models/user/user.repository.interface';
import {UserModel} from '../../../domain/models/user/user.model';
import {Injectable} from '@nestjs/common';
import {PrismaClientService} from '../orm/prisma-client.service';
import {UserMail} from '../../../domain/models/user/user.value';
import {EntityPId} from '../../../domain/models/common.value';
import {MyUtil} from '../../../utils/my.util';

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
                firstName     : userEntity.firstName,
                lastName      : userEntity.lastName,
                mail          : userEntity.mail,
                hashedPassWord: userEntity.hashedPw,
            },
            new EntityPId(userEntity.id),
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
                firstName     : userEntity.firstName,
                lastName      : userEntity.lastName,
                mail          : userEntity.mail,
                hashedPassWord: userEntity.hashedPw,
            },
            new EntityPId(userEntity.id),
        );
    }
}

@Injectable()
export class UserRepositoryMock implements IUserRepository {
    async create(user: UserModel): Promise<UserModel> {
        return new Promise((resolve) => {
            resolve(user);
        });
    }

    async findOneByMail(mail: UserMail): Promise<UserModel | null> {
        return new Promise((resolve) => {
            resolve(
                UserModel.create(
                    {
                        firstName     : 'あああ',
                        lastName      : 'いいい',
                        mail          : 'sample@googlea.com',
                        hashedPassWord: 'sdfghjk',
                    },
                    new EntityPId(MyUtil.createUUID()),
                ),
            );
        });
    }
}
