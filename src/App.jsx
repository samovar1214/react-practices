import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  function handleAdd(title) {
    setTasks([...tasks, { id: crypto.randomUUID(), title, completed: false }]);
  }

  function handleEdit(id, newTitle) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
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
      {totalTasks === 0 ? (
        <p>やることはまだありません</p>
      ) : (
        <>
          <p>
            全 {totalTasks} 件中 {completedTasks} 件完了
          </p>
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
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

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  function handleSave(e) {
    e.preventDefault();
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle === "") return;
    onEdit(task.id, trimmedTitle);
    setEditTitle(trimmedTitle);
    setIsEditing(false);
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {isEditing ? (
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <button type="submit">保存</button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditTitle(task.title);
            }}
          >
            キャンセル
          </button>
        </form>
      ) : (
        <>
          {task.completed ? <del>{task.title}</del> : task.title}
          <button type="button" onClick={() => setIsEditing(true)}>
            編集
          </button>
          <button type="button" onClick={() => onDelete(task.id)}>
            削除
          </button>
        </>
      )}
    </li>
  );
}
