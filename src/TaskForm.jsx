import { useState } from "react";

export default function TaskForm({ onAdd }) {
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
