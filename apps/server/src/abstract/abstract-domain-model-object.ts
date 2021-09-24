import {shallowEqual} from 'shallow-equal-object';
import {EntityPId} from '../domain/models/common.value';

interface DomainModelObjectProps {
    [index: string]: any;
}

export abstract class AbstractDomainModelObject<T extends DomainModelObjectProps> {
    private readonly _props: T;
    private readonly _id: EntityPId;

    protected constructor(_value: T, _id: EntityPId) {
        this._props = Object.freeze(_value);
        this._id = _id;
    }

    /**
     * Id同士を比較する
     * @param o
     */
    equals(o?: AbstractDomainModelObject<T>): boolean {
        if (o === undefined) {
            return false;
        }
        return shallowEqual(this._id, o._id);
    }

    protected get props(): T {
        return this._props;
    }

    /**
     * ユーザーのIDを参照
     */
    get id(): EntityPId {
        return this._id;
    }
}

