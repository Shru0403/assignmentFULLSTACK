import { useState } from "react";

function TaskInput({ addTask }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit() {
    if (title.trim() === "") return;

    addTask(title, dueDate || null);

    setTitle("");
    setDueDate("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="task-input-container">

      <input
        className="task-title-input"
        type="text"
        placeholder="What do you need to do today?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <input
        className="task-date-input"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button
        className="primary-btn"
        onClick={handleSubmit}
      >
        + Add Task
      </button>

    </div>
  );
}

export default TaskInput;