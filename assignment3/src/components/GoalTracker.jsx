import useLocalStorage from "../hooks/useLocalStorage";
import GoalInput from "./GoalInput";
import GoalCard from "./GoalCard";
import "./GoalTracker.css";

function GoalTracker() {
  const [goals, setGoals] = useLocalStorage("goals", [
    {
      id: 1,
      title: "Complete Cipher MVP",
      progress: 40,
      dueDate: null,
    },
  ]);

  function addGoal(title) {
    if (title.trim() === "") return;

    const newGoal = {
      id: Date.now(),
      title,
      progress: 0,
      dueDate: null,
    };

    setGoals((prevGoals) => [...prevGoals, newGoal]);
  }

  function editGoal(id, newTitle) {
    if (newTitle.trim() === "") return;

    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id
          ? { ...goal, title: newTitle }
          : goal
      )
    );
  }

  function updateProgress(id, change) {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress: Math.max(
                0,
                Math.min(100, goal.progress + change)
              ),
            }
          : goal
      )
    );
  }

  function deleteGoal(id) {
    setGoals((prevGoals) =>
      prevGoals.filter((goal) => goal.id !== id)
    );
  }

  return (
    <div className="goal-tracker">

      <div className="goal-header">

        <h2>🎯 Goals</h2>

      </div>

      <GoalInput addGoal={addGoal} />

      <div className="goal-list">

        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            updateProgress={updateProgress}
            deleteGoal={deleteGoal}
            editGoal={editGoal}
          />
        ))}

      </div>

    </div>
  );
}

export default GoalTracker;