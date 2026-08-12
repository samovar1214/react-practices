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

  function handleAdd(title) {
    setTasks([...tasks, { id: crypto.randomUUID(), title, completed: false }]);
  }

  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <>
      <h1>やること</h1>
      <TaskForm onAdd={handleAdd} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </>
  );
}

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle === "") return;
    onAdd(trimmedTitle);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="やることを入力"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">追加</button>
    </form>
  );
}

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {task.completed ? <del>{task.title}</del> : task.title}
      <button type="button" onClick={() => onDelete(task.id)}>
        削除
      </button>
    </li>
  );
}
