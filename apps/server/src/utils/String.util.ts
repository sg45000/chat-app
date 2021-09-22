export class StringUtil {
    /**
     * 与えられた文字列valueが端値を含む範囲の文字数にあるか
     * @param min
     * @param max
     * @param value
     */
    static between(min: number, max: number, value: string): boolean {
        return !!(min <= value.length && value.length <= max);
    }
}
