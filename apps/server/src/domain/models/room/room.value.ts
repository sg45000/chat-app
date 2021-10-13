import {AbstractValueObject} from '../../abstract/abstract-value-object';
import {IllegalArgumentException} from '../../../types/error.types';

export class RoomName extends AbstractValueObject<string> {
    private readonly MIN_LENGTH = 6;
    private readonly MAX_LENGTH = 25
    constructor(value: string) {
        super(value);
        if(this.illegalLengthValue(this.MIN_LENGTH, this.MAX_LENGTH, value)) {
            throw new IllegalArgumentException(`ルームの名前は${this.MIN_LENGTH}文字以上、${this.MAX_LENGTH}文字以下で設定してください。`);
        }
    }
}
