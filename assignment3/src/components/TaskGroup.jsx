import TaskItem from "./TaskItem";

function TaskGroup({
  title,
  tasks,
  allTasks,
  addTask,
  editTask,
  toggleTask,
  deleteTask,
}) {
  if (tasks.length === 0) return null;

  return (
    <section className="task-group">
      <h3>{title}</h3>

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          allTasks={allTasks}
          addTask={addTask}
          editTask={editTask}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </section>
  );
}

export default TaskGroup;