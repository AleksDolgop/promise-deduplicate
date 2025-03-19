# Promise deduplicate 

[![Downloads](https://img.shields.io/npm/dm/promise-deduplicate.svg)](https://www.npmjs.com/package/promise-deduplicate)

## Install

```shell
npm install promise-deduplicate
```

For `yarn`
```shell
yarn add promise-deduplicate
```

## Examples

### One key
```typescript
import { PromisesDeduplicate } from 'promise-deduplicate';

// Create deduplicator instance
const deduplicate = new PromisesDeduplicate();

let couner = 0

// Asynchronous function we want to deduplicated
async function fetchData(): Promise<string> {
    // Imitation of an asynchronous request
    return new Promise((resolve) => {
        setTimeout(() => resolve(++couner), 1000);
    });
}

// Using
async function main() {
    const id = '123';

    // The first challenge - will begin execution
    const promise1 = deduplicate.handle(id, () => fetchData());

    // The second challenge with the same key - will return the same Promis
    const promise2 = deduplicate.handle(id, () => fetchData());

    // We expect the end
    const result1 = await promise1;
    const result2 = await promise2;

    console.log(result1); // 1
    console.log(result2); // 1
}

main();
```

### Few keys

```typescript
import { PromisesDeduplicate } from 'promise-deduplicate';

const deduplicate = new PromisesDeduplicate();

let couner = 0

async function fetchData(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(++counter), 1000);
  });
}

async function main() {
  const id1 = '123';
  const id2 = '456';

  // First call for ID1
  const promise1 = deduplicate.handle(id1, () => fetchData());

  // First call for ID2
  const promise2 = deduplicate.handle(id2, () => fetchData());

  // We expect the end
  const result1 = await promise1;
  const result2 = await promise2;

  console.log(result1); // 1
  console.log(result2); // 2
}

main();
```

## Author

- [AleksDolgop | Github](https://github.com/AleksDolgop)

## Support

If you have questions or suggestions, create [issue](https://github.com/AleksDolgop/promise-deduplicate/issues)