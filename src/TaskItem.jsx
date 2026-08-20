import { useState } from "react";

export default function TaskItem({ task, onUpdate, onDelete }) {
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
