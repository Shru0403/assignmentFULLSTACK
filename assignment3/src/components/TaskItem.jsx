import { useState } from "react";

function TaskItem({
  task,
  allTasks,
  addTask,
  editTask,
  toggleTask,
  deleteTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");

  const [isAnimating, setIsAnimating] = useState(false);

  const subtasks = allTasks.filter(
    (t) => t.parentId === task.id
  );

  function handleSave() {
    if (newTitle.trim() === "") return;

    editTask(task.id, newTitle);
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSave();
    }
  }

  function handleAddSubtask() {
    if (subtaskTitle.trim() === "") return;

    addTask(subtaskTitle, null, task.id);

    setSubtaskTitle("");
    setShowSubtaskInput(false);
  }

  function handleToggle() {
    if (!task.completed) {
      // Animate before moving to Completed section
      setIsAnimating(true);

      setTimeout(() => {
        toggleTask(task.id);
        setIsAnimating(false);
      }, 400);
    } else {
      // Move back immediately
      toggleTask(task.id);
    }
  }

  return (
    <div
      className={`task-card ${
        isAnimating ? "fade-out" : ""
      }`}
    >
      <div className="task-top">

        <div className="task-title">

          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
          />

          {isEditing ? (
            <input
              className="text-input"
              value={newTitle}
              onChange={(e) =>
                setNewTitle(e.target.value)
              }
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <span
              className={
                task.completed || isAnimating
                  ? "completed-task"
                  : ""
              }
              onClick={() =>
                setIsEditing(true)
              }
            >
              {task.title}
            </span>
          )}

        </div>

      </div>

      {task.dueDate && (
        <div className="task-date">
          📅 {task.dueDate}
        </div>
      )}

      {subtasks.length > 0 && (
        <div className="subtasks">

          {subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className="subtask"
            >
              • {subtask.title}
            </div>
          ))}

        </div>
      )}

      <div className="task-actions">

        <button
          className="secondary-btn"
          onClick={() =>
            setShowSubtaskInput(
              !showSubtaskInput
            )
          }
        >
          + Subtask
        </button>

        <button
          className="danger-btn"
          onClick={() =>
            deleteTask(task.id)
          }
        >
          Delete
        </button>

      </div>

      {showSubtaskInput && (
        <div className="subtask-input">

          <input
            type="text"
            placeholder="Enter subtask..."
            value={subtaskTitle}
            onChange={(e) =>
              setSubtaskTitle(
                e.target.value
              )
            }
          />

          <button
            className="primary-btn"
            onClick={handleAddSubtask}
          >
            Add
          </button>

        </div>
      )}

    </div>
  );
}

export default TaskItem;