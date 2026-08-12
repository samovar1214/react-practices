import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "React のレンダリングを理解する",
      completed: true,
    },
    {
      id: 2,
      title: "より実践的な state の管理",
      completed: false,
    },
    {
      id: 3,
      title: "エフェクトとカスタム Hook",
      completed: false,
    },
  ]);

  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  return (
    <>
      <h1>やること</h1>
      <TaskList tasks={tasks} onToggle={handleToggle} />
    </>
  );
}

function TaskList({ tasks, onToggle }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  );
}

function TaskItem({ task, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {task.completed ? <del>{task.title}</del> : task.title}
    </li>
  );
}
