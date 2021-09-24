import {v4 as UUID} from 'uuid';

export class MyUtil {

    /**
     * UUIDの生成
     */
    static createUUID(): string {
        return UUID();
    }

    /**
     * 指定秒数間処理を停止する
     * @param sec
     */
    static async sleep(sec: number): Promise<void> {
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve();
            }, sec * 1000);
        });
    }

}
