import { useState, useContext } from "react";
import { ThemeContext } from "./ThemeContext.jsx";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const { isDark } = useContext(ThemeContext);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (trimmedTitle === "") return;

    onAdd(trimmedTitle);
    setTitle("");
  }

  return (
    <form
      className={`task-form ${isDark ? "dark" : ""}`}
      onSubmit={handleSubmit}
    >
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
