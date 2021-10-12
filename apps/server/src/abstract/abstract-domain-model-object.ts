import {shallowEqual} from 'shallow-equal-object';
import {EntityPId} from '../domain/models/common.value';

interface DomainModelObjectProps {
    [index: string]: any;
}

export abstract class AbstractDomainModelObject<T extends DomainModelObjectProps, ID_NAME extends string> {
    private readonly _props: T;
    private readonly _id: EntityPId<ID_NAME>;

    protected constructor(_value: T, _id: EntityPId<ID_NAME>) {
        this._props = Object.freeze(_value);
        this._id = _id;
    }

    /**
     * Id同士を比較する
     * @param o
     */
    equals(o?: AbstractDomainModelObject<T, ID_NAME>): boolean {
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
    get id(): EntityPId<ID_NAME> {
        return this._id;
    }
}

