import {AbstractValueObject} from '../../../abstract/abstract-value-object';
import {IllegalArgumentException} from '../../../../types/error.types';

export class ImagePostDataUri extends AbstractValueObject<string> {
    constructor(value: string) {
        super(value);
        const regex = new RegExp(/-/g); // fixme
        if(!regex.test(value)) {
            throw new IllegalArgumentException('');
        }
    }
}
