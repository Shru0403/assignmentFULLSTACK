import useLocalStorage from "../hooks/useLocalStorage";
import MoodInput from "./MoodInput";
import MoodCard from "./MoodCard";
import "./MoodBoard.css";

function MoodBoard() {
  const [moodItems, setMoodItems] = useLocalStorage("moodItems", [
    {
      id: 1,
      text: "Stay Consistent 💪",
    },
    {
      id: 2,
      text: "Trust the Process 🚀",
    },
  ]);

  function addMoodItem(text) {
    if (text.trim() === "") return;

    const newItem = {
      id: Date.now(),
      text,
    };

    setMoodItems((prevItems) => [...prevItems, newItem]);
  }

  function deleteMoodItem(id) {
    setMoodItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  }

  return (
    <div className="mood-board">

      <div className="mood-header">
        <h2>✨ Mood Board</h2>
      </div>

      <MoodInput addMoodItem={addMoodItem} />

      <div className="mood-grid">
        {moodItems.map((item) => (
          <MoodCard
            key={item.id}
            item={item}
            deleteMoodItem={deleteMoodItem}
          />
        ))}
      </div>

    </div>
  );
}

export default MoodBoard;