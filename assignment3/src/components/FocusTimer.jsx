import { useState, useEffect } from "react";
import useTimer from "../hooks/useTimer";
import "./FocusTimer.css";

function FocusTimer() {
  const {
    minutes,
    seconds,
    startTimer,
    pauseTimer,
    resetTimer,
    isRunning,
  } = useTimer(25);

  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [duration, setDuration] = useState(25);

  useEffect(() => {
    const storedTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    const availableTasks = storedTasks.filter(
      (task) => !task.completed && task.parentId === null
    );

    setTasks(availableTasks);

    if (availableTasks.length > 0) {
      setSelectedTaskId(availableTasks[0].id);
    }
  }, []);

  function handlePresetClick(value) {
    setDuration(value);
    resetTimer(value);
  }

  function handleCustomChange(e) {
    const value = Number(e.target.value);

    if (value > 0) {
      setDuration(value);
      resetTimer(value);
    }
  }

  const selectedTask = tasks.find(
    (task) => task.id === Number(selectedTaskId)
  );

  return (
    <div className="focus-container">

      <h2 className="focus-title">
        ⏱ Focus Timer
      </h2>

      {/* Session Length */}

      <div className="focus-duration">

        <label>Session Length</label>

        <div className="preset-buttons">

          {[15, 25, 45, 60].map((time) => (
            <button
              key={time}
              className={
                duration === time
                  ? "preset-btn active"
                  : "preset-btn"
              }
              onClick={() =>
                handlePresetClick(time)
              }
            >
              {time} min
            </button>
          ))}

        </div>

        <div className="custom-duration">

          <label>Custom</label>

          <input
            type="number"
            min="1"
            max="300"
            value={duration}
            onChange={handleCustomChange}
          />

          <span>minutes</span>

        </div>

      </div>

      {/* Task Selection */}

      <div className="focus-select">

        <label>Select Task</label>

        <select
          value={selectedTaskId}
          onChange={(e) =>
            setSelectedTaskId(e.target.value)
          }
        >
          {tasks.length === 0 ? (
            <option>No incomplete tasks</option>
          ) : (
            tasks.map((task) => (
              <option
                key={task.id}
                value={task.id}
              >
                {task.title}
              </option>
            ))
          )}
        </select>

      </div>

      {/* Timer */}

      <div className="timer-circle">

        <div className="timer-text">

          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}

        </div>

      </div>

      {selectedTask && (
        <p className="focus-task">

          Focusing on:
          <strong>
            {" "}
            {selectedTask.title}
          </strong>

        </p>
      )}

      <div className="timer-buttons">

        <button
          className="primary-btn"
          onClick={startTimer}
        >
          ▶ Start
        </button>

        <button
          className="secondary-btn"
          onClick={pauseTimer}
        >
          ⏸ Pause
        </button>

        <button
          className="danger-btn"
          onClick={() =>
            resetTimer(duration)
          }
        >
          ↺ Reset
        </button>

      </div>

    </div>
  );
}

export default FocusTimer;