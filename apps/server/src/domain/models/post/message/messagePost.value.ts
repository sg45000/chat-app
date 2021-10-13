import {IllegalArgumentException} from '../../../../types/error.types';
import {AbstractValueObject} from '../../../abstract/abstract-value-object';

export class MessagePostText extends AbstractValueObject<string>{
    private readonly MIN_LENGTH = 0;
    private readonly MAX_LENGTH = 255
    constructor(value: string) {
        super(value);
        if(this.illegalLengthValue(this.MIN_LENGTH, this.MAX_LENGTH, value)) {
            throw new IllegalArgumentException(`メッセージは${this.MIN_LENGTH}文字以上、${this.MAX_LENGTH}文字以下で設定してください。`);
        }
    }
}
