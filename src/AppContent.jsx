import { useReducer, useContext } from "react";
import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";
import { ThemeContext } from "./ThemeContext.jsx";

function tasksReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        history: [...state.history, state.tasks],
        tasks: [...state.tasks, action.task],
        future: [],
      };
    case "update":
      return {
        history: [...state.history, state.tasks],
        tasks: state.tasks.map((task) =>
          task.id === action.updatedTask.id ? action.updatedTask : task,
        ),
        future: [],
      };
    case "delete":
      return {
        history: [...state.history, state.tasks],
        tasks: state.tasks.filter((task) => task.id !== action.id),
        future: [],
      };
    case "undo":
      if (state.history.length === 0) return state;
      return {
        history: state.history.slice(0, -1),
        tasks: state.history[state.history.length - 1],
        future: [...state.future, state.tasks],
      };
    case "redo":
      if (state.future.length === 0) return state;
      return {
        history: [...state.history, state.tasks],
        tasks: state.future[state.future.length - 1],
        future: state.future.slice(0, -1),
      };
    default:
      return state;
  }
}

export default function AppContent() {
  const initialState = { tasks: [], history: [], future: [] };
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter((task) => task.completed).length;

  const { isDark, setIsDark } = useContext(ThemeContext);

  function handleAdd(title) {
    dispatch({
      type: "add",
      task: { id: crypto.randomUUID(), title, completed: false },
    });
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

  function handleRedo() {
    dispatch({ type: "redo" });
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
          <div className="history-buttons">
            <button
              className="button cancel-button"
              type="button"
              onClick={handleUndo}
              disabled={state.history.length === 0}
            >
              元に戻す
            </button>
            <button
              className="button cancel-button"
              type="button"
              onClick={handleRedo}
              disabled={state.future.length === 0}
            >
              やり直す
            </button>
          </div>
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
