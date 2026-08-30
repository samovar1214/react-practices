import { useReducer, useContext } from "react";
import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";
import { ThemeContext } from "./ThemeContext.jsx";

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

export default function AppContent() {
  const initialState = { tasks: [], history: [] };
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter((task) => task.completed).length;

  const { isDark, setIsDark } = useContext(ThemeContext);

  function handleAdd(title) {
    dispatch({ type: "add", title });
  }

  function handleUpdate(updatedTask) {
    dispatch({ type: "update", updatedTask });
  }

  function handleDelete(id) {
    dispatch({ type: "delete", id });
  }

  function handleUndo() {
    dispatch({ type: "undo" });
  }

  return (
    <div className={`app ${isDark ? "dark" : ""}`}>
      <header className="app-header">
        <h1>やること</h1>
      </header>

      <div className="theme-toggle-area">
        <button
          className="button theme-toggle-button"
          type="button"
          onClick={() => setIsDark((isDark) => !isDark)}
        >
          {isDark ? "ライトモードに切り替える" : "ダークモードに切り替える"}
        </button>
      </div>

      <main className="main-content">
        <section className={`task-panel ${isDark ? "dark" : ""}`}>
          <TaskForm onAdd={handleAdd} />
          <button
            type="button"
            onClick={handleUndo}
            disabled={state.history.length === 0}
          >
            元に戻す
          </button>
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
