import {AbstractValueObject} from '../../abstract/abstract-value-object';
import {isUUID} from '@nestjs/common/utils/is-uuid';
import {IllegalArgumentException} from '../../types/error.types';

export class EntityPId extends AbstractValueObject<string> {
    constructor(value: string) {
        super(value);
        if(!isUUID(value)) {
            throw new IllegalArgumentException('uuidを指定してください。');
        }
    }
}
