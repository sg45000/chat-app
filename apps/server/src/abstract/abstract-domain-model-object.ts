import {shallowEqual} from 'shallow-equal-object';

interface DomainModelObjectProps {
    [index: string]: any;
}

export abstract class AbstractDomainModelObject<T extends DomainModelObjectProps> {
    private readonly _props: T;

    protected constructor(_value: T) {
        this._props = Object.freeze(_value);
    }

    equals(o?: AbstractDomainModelObject<T>): boolean {
        if (o === undefined) {
            return false;
        }
        return shallowEqual(this._props, o._props);
    }

    get props(): T {
        return this._props;
    }
}

