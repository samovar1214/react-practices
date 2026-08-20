import { useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  function handleAdd(title) {
    setTasks([...tasks, { id: crypto.randomUUID(), title, completed: false }]);
  }

  function handleUpdate(updatedTask) {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>やること</h1>
      </header>

      <main className="main-content">
        <section className="task-panel">
          <TaskForm onAdd={handleAdd} />

          {totalTasks === 0 ? (
            <p className="empty-message">やることはまだありません</p>
          ) : (
            <>
              <p className="task-count">
                全 {totalTasks} 件中 {completedTasks} 件完了
              </p>

              <TaskList
                tasks={tasks}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            </>
          )}
        </section>
      </main>
    </div>
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
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        value={title}
        placeholder="やることを入力"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className="button add-button" type="submit">
        追加
      </button>
    </form>
  );
}

function TaskList({ tasks, onUpdate, onDelete }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  function handleSave(e) {
    e.preventDefault();
    const trimmedTitle = editTitle.trim();

    if (trimmedTitle === "") return;

    onUpdate({ ...task, title: trimmedTitle });
    setEditTitle(trimmedTitle);
    setIsEditing(false);
  }

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onUpdate({ ...task, completed: !task.completed })}
      />

      {isEditing ? (
        <form className="edit-form" onSubmit={handleSave}>
          <input
            className="edit-input"
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <div className="button-group">
            <button className="button save-button" type="submit">
              保存
            </button>

            <button
              className="button cancel-button"
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditTitle(task.title);
              }}
            >
              キャンセル
            </button>
          </div>
        </form>
      ) : (
        <>
          <span className="task-title">
            {task.completed ? <del>{task.title}</del> : task.title}
          </span>

          <div className="button-group">
            <button
              className="button edit-button"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              編集
            </button>

            <button
              className="button delete-button"
              type="button"
              onClick={() => onDelete(task.id)}
            >
              削除
            </button>
          </div>
        </>
      )}
    </li>
  );
}
