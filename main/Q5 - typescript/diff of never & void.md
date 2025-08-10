/** Can you explain about the type of never and what is the differ with void? **/

在 TS 中 never 表示永遠不會成立 也就是永遠不會有值也不能賦值
但是 void 表示為沒有回傳值但是可以正常執行 並且可以賦值 undefined

```ts
// never - 這個函數永遠不會返回
const processError = (message: string): never => {
  throw new Error(message);
  // 這行永遠不會執行
  console.log('never print');
};

// void - 這個函數會正常執行完畢，只是沒返回值
const demo = (): void => {
  console.log('print sth'); // 這行會執行
  // 實際上會 return undefined
};
```
