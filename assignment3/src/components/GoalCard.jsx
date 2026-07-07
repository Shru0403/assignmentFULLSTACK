import { useState } from "react";

function GoalCard({
  goal,
  updateProgress,
  deleteGoal,
  editGoal,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(goal.title);

  function handleSave() {
    if (newTitle.trim() === "") return;

    editGoal(goal.id, newTitle);
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSave();
    }
  }

  return (
    <div className="goal-card">

      <div className="goal-card-header">

        {isEditing ? (
          <input
            className="text-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <h3
            onClick={() => setIsEditing(true)}
            style={{ cursor: "pointer" }}
            title="Click to edit"
          >
            {goal.title}
          </h3>
        )}

        <span className="goal-percentage">
          {goal.progress}%
        </span>

      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${goal.progress}%`,
          }}
        ></div>
      </div>

      <div className="goal-actions">

        <button
          className="secondary-btn"
          onClick={() =>
            updateProgress(goal.id, -10)
          }
        >
          −10%
        </button>

        <button
          className="primary-btn"
          onClick={() =>
            updateProgress(goal.id, 10)
          }
        >
          +10%
        </button>

        <button
          className="danger-btn"
          onClick={() =>
            deleteGoal(goal.id)
          }
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default GoalCard;