import {v4 as UUID} from 'uuid';

export class MyUtil {

    /**
     * UUIDの生成
     */
    static createUUID(): string {
        return UUID();
    }

}
