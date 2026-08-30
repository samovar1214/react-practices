import { useReducer } from "react";
import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";
import "./App.css";

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "add":
      return [
        ...tasks,
        { id: crypto.randomUUID(), title: action.title, completed: false },
      ];
    case "update":
      return tasks.map((task) =>
        task.id === action.updatedTask.id ? action.updatedTask : task,
      );
    case "delete":
      return tasks.filter((task) => task.id !== action.id);
    default:
      return tasks;
  }
}

export default function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  function handleAdd(title) {
    dispatch({ type: "add", title });
  }

  function handleUpdate(updatedTask) {
    dispatch({ type: "update", updatedTask });
  }

  function handleDelete(id) {
    dispatch({ type: "delete", id });
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
