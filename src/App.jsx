import { useState } from "react";
import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";
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
