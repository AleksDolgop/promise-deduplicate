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

// Создаем экземпляр дедупликатора
const deduplicate = new PromisesDeduplicate();

// Асинхронная функция, которую мы хотим дедуплицировать
async function fetchData(id: string): Promise<string> {
    console.log(`Fetching data for id: ${id}`);
    // Имитация асинхронного запроса
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data for ${id}`), 1000);
    });
}

// Использование дедупликатора
async function main() {
    const id = '123';

    // Первый вызов - начнет выполнение
    const promise1 = deduplicate.handle(id, () => fetchData(id));

    // Второй вызов с тем же ключом - вернет тот же промис
    const promise2 = deduplicate.handle(id, () => fetchData(id));

    // Ожидаем завершения
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

  // Первый вызов для id1
  const promise1 = deduplicate.handle(id1, () => fetchData(id1));

  // Первый вызов для id2
  const promise2 = deduplicate.handle(id2, () => fetchData(id2));

  // Ожидаем завершения
  const result1 = await promise1;
  const result2 = await promise2;

  console.log(result1); // Data for 123
  console.log(result2); // Data for 456
}

main();
```

## Authors

- [Aleksandr Dolgopolov](https://github.com/AleksDolgop)

## Support

If you have questions or suggestions, create [issue](https://github.com/AleksDolgop/promise-deduplicate/issues)