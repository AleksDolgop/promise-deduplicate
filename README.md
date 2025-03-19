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

// Asynchronous function we want to deduplicated
async function fetchData(id: string): Promise<string> {
    console.log(`Fetching data for id: ${id}`);
    // Imitation of an asynchronous request
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data for ${id}`), 1000);
    });
}

// Using
async function main() {
    const id = '123';

    // The first challenge - will begin execution
    const promise1 = deduplicate.handle(id, () => fetchData(id));

    // The second challenge with the same key - will return the same Promis
    const promise2 = deduplicate.handle(id, () => fetchData(id));

    // We expect the end
    const result1 = await promise1;
    const result2 = await promise2;

    console.log(result1); // Data for 123
    console.log(result2); // Data for 123
}

main();
```

### Few keys

```typescript
import { PromisesDeduplicate } from 'promise-deduplicate';

const deduplicate = new PromisesDeduplicate();

async function fetchData(id: string): Promise<string> {
  console.log(`Fetching data for id: ${id}`);
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data for ${id}`), 1000);
  });
}

async function main() {
  const id1 = '123';
  const id2 = '456';

  // First call for ID1
  const promise1 = deduplicate.handle(id1, () => fetchData(id1));

  // First call for ID2
  const promise2 = deduplicate.handle(id2, () => fetchData(id2));

  // We expect the end
  const result1 = await promise1;
  const result2 = await promise2;

  console.log(result1); // Data for 123
  console.log(result2); // Data for 456
}

main();
```

## Author

- [AleksDolgop | Github](https://github.com/AleksDolgop)

## Support

If you have questions or suggestions, create [issue](https://github.com/AleksDolgop/promise-deduplicate/issues)