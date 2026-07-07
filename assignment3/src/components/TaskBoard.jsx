import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import TaskInput from "./TaskInput";
import TaskGroup from "./TaskGroup";
import "./TaskBoard.css";
import groupTasks from "../utils/groupTasks";

function TaskBoard() {
  const [tasks, setTasks] = useLocalStorage("tasks", [
    {
      id: 1,
      title: "Learn React",
      completed: false,
      dueDate: "2026-07-05",
      parentId: null,
    },
    {
      id: 2,
      title: "Build Cipher MVP",
      completed: false,
      dueDate: "2026-07-07",
      parentId: null,
    },
    {
      id: 3,
      title: "Read about Hooks",
      completed: true,
      dueDate: null,
      parentId: null,
    },
  ]);

  // Controls whether the Completed section is expanded
  const [showCompleted, setShowCompleted] = useState(false);

  function addTask(title, dueDate, parentId = null) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      dueDate,
      parentId,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function editTask(id, newTitle) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle }
          : task
      )
    );
  }

  function toggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) =>
          task.id !== id &&
          task.parentId !== id
      )
    );
  }

  // Parent tasks only
  const parentTasks = tasks.filter(
    (task) => task.parentId === null
  );

  // Active & Completed
  const activeTasks = parentTasks.filter(
    (task) => !task.completed
  );

  const completedTasks = parentTasks.filter(
    (task) => task.completed
  );

  // Group ONLY active tasks
  const groupedTasks = groupTasks(activeTasks);

  return (
    <div className="taskboard">

      <div className="taskboard-header">
        <h2>📝 Tasks</h2>
      </div>

      <TaskInput addTask={addTask} />

      <TaskGroup
        title="⚠ Overdue"
        tasks={groupedTasks.overdue}
        allTasks={tasks}
        addTask={addTask}
        editTask={editTask}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      <TaskGroup
        title="📅 Today"
        tasks={groupedTasks.today}
        allTasks={tasks}
        addTask={addTask}
        editTask={editTask}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      <TaskGroup
        title="🚀 Upcoming"
        tasks={groupedTasks.upcoming}
        allTasks={tasks}
        addTask={addTask}
        editTask={editTask}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      <TaskGroup
        title="📌 No Date"
        tasks={groupedTasks.noDate}
        allTasks={tasks}
        addTask={addTask}
        editTask={editTask}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      {/* Completed Section */}

      <div
        className="completed-header"
        onClick={() =>
          setShowCompleted(!showCompleted)
        }
      >
        <h3>
          {showCompleted ? "▼" : "►"} Completed (
          {completedTasks.length})
        </h3>
      </div>

      {showCompleted && (
        <TaskGroup
          title=""
          tasks={completedTasks}
          allTasks={tasks}
          addTask={addTask}
          editTask={editTask}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      )}

    </div>
  );
}

export default TaskBoard;