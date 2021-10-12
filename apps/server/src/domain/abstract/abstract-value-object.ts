import {shallowEqual} from 'shallow-equal-object';
import {StringUtil} from '../../utils/String.util';

export abstract class AbstractValueObject<T> {
    protected readonly _value: T;

    protected constructor(_value: T) {
        this._value = Object.freeze(_value);
    }

    equals(vo?: AbstractValueObject<T>): boolean {
        if (vo === undefined) {
            return false;
        }
        return shallowEqual(this._value, vo._value);
    }

    get value(): T {
        return this._value;
    }

    /**
     * 値が範囲外の文字列長か
     * @param min
     * @param max
     * @param value
     */
    protected illegalLengthValue(min: number, max: number, value: string): boolean {
        return !StringUtil.between(min, max, value);
    }
}
