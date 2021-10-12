import {isUUID} from '@nestjs/common/utils/is-uuid';
import {IllegalArgumentException} from '../../types/error.types';
import {v4 as UUID} from 'uuid';
import {DomainModelTypes} from '../DomainModel.types';
import {AbstractValueObject} from '../abstract/abstract-value-object';

export class EntityPId<MODEL_TYPE extends DomainModelTypes> extends AbstractValueObject<string> {

    private readonly type: MODEL_TYPE; // 別のモデルのIDオブジェクトと型の構造を分けるために宣言

    protected constructor(value: string) {
        super(value);
        if(!isUUID(value)) {
            throw new IllegalArgumentException('uuidを指定してください。');
        }
    }

    /**
     * idを新しく採番し、インスタンスを生成
     */
    static create<MODEL_TYPE extends DomainModelTypes>(): EntityPId<MODEL_TYPE> {
        return new EntityPId<MODEL_TYPE>(UUID());
    }

    /**
     * 再構築用のファクトリメソッド
     * @param id
     */
    static reconstruct<MODEL_TYPE extends DomainModelTypes>(id: string): EntityPId<MODEL_TYPE> {
        return new EntityPId<MODEL_TYPE>(id);
    }
}
