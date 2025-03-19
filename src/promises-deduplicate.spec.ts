import { PromisesDeduplicate } from './promises-deduplicate'

const sleep = (ms: number): Promise<void> =>  new Promise(resolve => setTimeout(resolve, ms))

describe('PromisesDeduplicate', () => {
    it('should be perform one of the handlers. Return counter 1', async () => {
        const promiseDeduplicate = new PromisesDeduplicate()

        let counter = 0
        const asyncFn = async (): Promise<void> => {
            await sleep(1000)
            counter++
        }

        await Promise.all([
            promiseDeduplicate.handle('1', asyncFn),
            promiseDeduplicate.handle('1', asyncFn),
            promiseDeduplicate.handle('1', asyncFn),
            promiseDeduplicate.handle('1', asyncFn),
            promiseDeduplicate.handle('1', asyncFn),
        ])

        expect(counter++).toBe(1)
    })
    it('should be completed one time for each handler. Return counter 5', async () => {
        const promiseDeduplicate = new PromisesDeduplicate()

        let counter = 0
        const asyncFn = async (): Promise<void> => {
            await sleep(1000)
            counter++
        }

        await Promise.all([
            promiseDeduplicate.handle('1', asyncFn),
            promiseDeduplicate.handle('2', asyncFn),
            promiseDeduplicate.handle('3', asyncFn),
            promiseDeduplicate.handle('4', asyncFn),
            promiseDeduplicate.handle('5', asyncFn),
        ])

        expect(counter++).toBe(5)
    })
})
