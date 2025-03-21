export class PromisesDeduplicate {
    private _promises: Record<string | number, any | undefined> = {}

    async handle<T>(key: string | number, cb: () => Promise<T>): Promise<T> {
        if (this._promises[key]) {
            return await this._promises[key]
        }

        this._promises[key] = cb().finally(() => (this._promises[key] = undefined))
        return await this._promises[key]
    }
}
