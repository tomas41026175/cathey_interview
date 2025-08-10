import { useState, useCallback } from 'react';

/*
 * 優化說明：
 * 1. 使用 useCallback 優化事件處理函數，避免不必要的重新渲染
 * 2. 改善類型定義，使用 interface 提高可讀性
 * 3. 添加適當的註釋說明
 * 4. 使用更語義化的變數名稱
 */

// export default function TaskManager() {
//   const [isPersonAlice, setIsPersonAlice] = useState(true);
//   return (
//     <div>
//       {isPersonAlice ? <TaskCounter name='Alice' /> : <TaskCounter name='Bob' />}
//       <button
//         onClick={() => {
//           setIsPersonAlice(!isPersonAlice);
//         }}
//       >
//         Switch Person
//       </button>
//     </div>
//   );
// }

// const TaskCounter = ({ name }: { name: string }) => {
//   const [tasks, setTasks] = useState(0);
//   return (
//     <>
//       <h1>
//         {name}'s tasks: {tasks}
//       </h1>
//       <button onClick={() => setTasks(tasks + 1)}>Complete Task</button>
//     </>
//   );
// };

interface Person {
  id: string;
  name: string;
  tasks: number;
}

const TaskManager: React.FC = () => {
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [people, setPeople] = useState<Person[]>([
    { id: 'alice', name: 'Alice', tasks: 0 },
    { id: 'bob', name: 'Bob', tasks: 0 },
  ]);

  const currentPerson = people[currentPersonIndex];

  const handlePersonSwitch = useCallback(() => {
    setCurrentPersonIndex((prev) => (prev + 1) % people.length);
  }, [people.length]);

  const handleTaskComplete = useCallback(() => {
    setPeople((prev) =>
      prev.map((person, index) =>
        index === currentPersonIndex ? { ...person, tasks: person.tasks + 1 } : person
      )
    );
  }, [currentPersonIndex]);

  if (!currentPerson) {
    return <div>No person available</div>;
  }

  return (
    <div className='task-manager'>
      <TaskCounter
        key={currentPerson.id}
        person={currentPerson}
        onTaskComplete={handleTaskComplete}
      />

      <button
        onClick={handlePersonSwitch}
        className='switch-button'
        aria-label={`Switch to ${people[(currentPersonIndex + 1) % people.length]?.name || 'next person'}`}
      >
        Switch to {people[(currentPersonIndex + 1) % people.length]?.name || 'Next'}
      </button>

      <div className='people-status' aria-label='Task summary'>
        {people.map((person, index) => (
          <span
            key={person.id}
            className={`person-status ${index === currentPersonIndex ? 'active' : ''}`}
          >
            {person.name}: {person.tasks}
          </span>
        ))}
      </div>
    </div>
  );
};

const TaskCounter: React.FC<{
  person: Person;
  onTaskComplete: () => void;
}> = ({ person, onTaskComplete }) => {
  return (
    <div className='task-counter'>
      <h1 className='task-title'>
        {person.name}'s tasks: {person.tasks}
      </h1>
      <button
        onClick={onTaskComplete}
        className='complete-button'
        aria-label={`Complete task for ${person.name}`}
      >
        Complete Task
      </button>
    </div>
  );
};

export default TaskManager;
