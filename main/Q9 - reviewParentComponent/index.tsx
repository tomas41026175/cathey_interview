import { useState } from 'react';

/* 問題點 */
// 1. GrandchildComponent 重複調用
// 2. ChildComponent & GrandchildComponent 接收的參數實際上是一樣的 可以提升成一個 props
// 3. ChildComponent & GrandchildComponent 的實際功能一致 可以合併成一個組件
// 4. 無效的 div 可以改成 <></>
// 5. 使用了 useState 但是沒有使用 setState
// 6. 實際使用與 Naming 不符

function ParentComponent() {
  const [name, setName] = useState('Naro');
  const [age, setAge] = useState(12);
  return (
    <div>
      <ChildComponent name={name} age={age} />
      <GrandchildComponent name={name} age={age} />
    </div>
  );
}
function ChildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <GrandchildComponent name={name} age={age} />
    </div>
  );
}
function GrandchildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
