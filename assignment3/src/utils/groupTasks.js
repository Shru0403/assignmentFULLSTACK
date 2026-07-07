function groupTasks(tasks) {
  const today = new Date();

  // Remove time so comparisons are only by date
  today.setHours(0, 0, 0, 0);

  const groups = {
    overdue: [],
    today: [],
    upcoming: [],
    noDate: [],
  };

  tasks.forEach((task) => {
    if (!task.dueDate) {
      groups.noDate.push(task);
      return;
    }

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    if (due < today) {
      groups.overdue.push(task);
    } else if (due.getTime() === today.getTime()) {
      groups.today.push(task);
    } else {
      groups.upcoming.push(task);
    }
  });

  return groups;
}

export default groupTasks;