import { useReducer } from "react";
import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";
import "./App.css";

function tasksReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        history: [...state.history, state.tasks],
        tasks: [
          ...state.tasks,
          { id: crypto.randomUUID(), title: action.title, completed: false },
        ],
      };
    case "update":
      return {
        history: [...state.history, state.tasks],
        tasks: state.tasks.map((task) =>
          task.id === action.updatedTask.id ? action.updatedTask : task,
        ),
      };
    case "delete":
      return {
        history: [...state.history, state.tasks],
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "undo":
      if (state.history.length === 0) return state;
      return {
        history: state.history.slice(0, -1),
        tasks: state.history[state.history.length - 1],
      };
    default:
      return state;
  }
}

export default function App() {
  const initialState = { tasks: [], history: [] };
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter((task) => task.completed).length;

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
                tasks={state.tasks}
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
