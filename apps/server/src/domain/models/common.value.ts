import {AbstractValueObject} from '../../abstract/abstract-value-object';
import {isUUID} from '@nestjs/common/utils/is-uuid';
import {IllegalArgumentException} from '../../types/error.types';
import {v4 as UUID} from 'uuid';

export class EntityPId<ID_NAME extends string> extends AbstractValueObject<string> {
    private readonly type: ID_NAME;
    protected constructor(value: string) {
        super(value);
        if(!isUUID(value)) {
            throw new IllegalArgumentException('uuidを指定してください。');
        }
        this.type = '' as ID_NAME;
    }

    /**
     * idを新しく採番し、インスタンスを生成
     */
    static create<ID_NAME extends string>(): EntityPId<ID_NAME> {
        return new EntityPId<ID_NAME>(UUID());
    }

    /**
     * 再構築用のファクトリメソッド
     * @param id
     */
    static reconstruct<ID_NAME extends string>(id: string): EntityPId<ID_NAME> {
        return new EntityPId<ID_NAME>(id);
    }
}
