import {AbstractValueObject} from '../../abstract/abstract-value-object';
import {isUUID} from '@nestjs/common/utils/is-uuid';
import {IllegalArgumentException} from '../../types/error.types';
import {v4 as UUID} from 'uuid';

export class EntityPId extends AbstractValueObject<string> {
    constructor(value: string) {
        super(value);
        if(!isUUID(value)) {
            throw new IllegalArgumentException('uuidを指定してください。');
        }
    }

    /**
     * idを新しく採番し、インスタンスを生成
     */
    static create(): EntityPId {
        return new EntityPId(UUID());
    }
}
