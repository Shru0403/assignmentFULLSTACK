import { useState } from "react";

function GoalInput({ addGoal }) {
  const [title, setTitle] = useState("");

  function handleSubmit() {
    if (title.trim() === "") return;

    addGoal(title);
    setTitle("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="goal-input-container">
      <input
        type="text"
        className="goal-input"
        placeholder="What's your next goal?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className="primary-btn"
        onClick={handleSubmit}
      >
        + Add Goal
      </button>
    </div>
  );
}

export default GoalInput;