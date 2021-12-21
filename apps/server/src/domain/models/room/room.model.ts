import {AbstractDomainModelObject} from '../../abstract/abstract-domain-model-object';
import {UserModel} from '../user/user.model';
import {EntityPId} from '../common.value';
import {RoomName} from './room.value';
import {MutationException} from '../../../types/error.types';
import {NG, OK, Result} from '../../../types/result.types';

export interface RoomModelProps {
    name: RoomName;
    members: EntityPId<UserModel>[];
}

export interface RoomModelArgs {
    name: string;
}

export class RoomModel extends AbstractDomainModelObject<RoomModelProps, RoomModel> {
    /**
     * 最大人数
     */
    readonly MAX_NUM_MEMBERS = 4;

    /**
     * ファクトリメソッド
     * idも新しく採番
     * @param args
     */
    static create(args: RoomModelArgs): RoomModel {
        return new RoomModel({
            name   : new RoomName(args.name),
            members: [],
        },
        EntityPId.create(),
        );
    }

    /**
     * 再構築用のファクトリメソッド
     * @param args
     * @param id
     */
    static reconstruct(args: RoomModelArgs, id: EntityPId<RoomModel>): RoomModel {
        return new RoomModel(
            {
                name   : new RoomName(args.name),
                members: [],
            },
            id,
        );
    }

    /**
     * メンバーをトークルームに追加する
     * @param user
     */
    addMember(user: UserModel): Result<undefined, MutationException> {
        if(this.exceedMembersLimit()) {
            return new NG(new MutationException('人数の上限に達しています。'));
        }
        this.props.members.push(user.id);
        return new OK(undefined);
    }

    /**
     * メンバーの人数を数える
     */
    countMember(): number {
        return this.props.members.length;
    }

    /**
     * メンバーの数が制限を超えている
     */
    exceedMembersLimit(): boolean {
        return this.MAX_NUM_MEMBERS <= this.countMember();
    }

    get name(): RoomName {
        return this.props.name;
    }
}
