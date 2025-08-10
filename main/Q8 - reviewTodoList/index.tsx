import { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: '學習 React', completed: false, studyPoint: 3 },
    { id: 2, text: '建立專案', completed: false, studyPoint: 1 },
  ]);

  // 這邊是複數不是單數 不能這樣解構
  // const ids = todos.map((t) => t.id);
  // const texts = todos.map((t) => t.text);
  // const studyPoints = todos.map((t) => t.studyPoint);
  // const completeds = todos.map((t) => t.completed);

  const { id, text, studyPoint } = todos;

  const [basePoints, setbasePoints] = useState(3);
  const [sumPoints, setSumPoints] = useState(0);

  const toggleTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    // 這邊應該保持 immutable 的特性 不要直接修改 state
    // 而是透過 setTodos 來更新 state
    // setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    todo.completed = !todo.completed;
    setTodos(todos);
  };
  const handleStudyPointsChange = (e) => {
    // 這邊應該是透過 setBasePoints 來更新 basePoints
    // setbasePoints(e.target.value);
    basePoints(e.target.value);
    setSumPoints(parseInt(value1) + parseInt(e.target.value));
  };
  return (
    <div>
      <p>課程名稱: {text}</p>
      <label>學習點數: </label>
      <input type='number' value={studyPoint} onChange={handleStudyPointsChange} />
      <p>總累積點數: {sumPoints}</p>
      {/* 這編的 onClick 應該是個 function 而不是直接呼叫 */}
      {/* <button onClick={() => toggleTodo(id)}>篩選課程</button> */}
      <button onClick={toggleTodo(id)}>篩選課程</button>
    </div>
  );
};

export default TodoList;
