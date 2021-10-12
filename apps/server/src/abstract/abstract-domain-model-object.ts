import {shallowEqual} from 'shallow-equal-object';
import {EntityPId} from '../domain/models/common.value';

interface DomainModelObjectProps {
    [index: string]: any;
}

export type DomainModelTypes = 'user' | 'session';

export abstract class AbstractDomainModelObject<T extends DomainModelObjectProps, MODEL_TYPE extends DomainModelTypes> {
    private readonly _props: T;
    private readonly _id: EntityPId<MODEL_TYPE>;

    protected constructor(_value: T, _id: EntityPId<MODEL_TYPE>) {
        this._props = Object.freeze(_value);
        this._id = _id;
    }

    /**
     * Id同士を比較する
     * @param o
     */
    equals(o?: AbstractDomainModelObject<T, MODEL_TYPE>): boolean {
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
    get id(): EntityPId<MODEL_TYPE> {
        return this._id;
    }
}

