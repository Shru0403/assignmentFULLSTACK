import { useState } from "react";

function MoodInput({ addMoodItem }) {
  const [text, setText] = useState("");

  function handleSubmit() {
    if (text.trim() === "") return;

    addMoodItem(text);
    setText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="mood-input-container">

      <input
        type="text"
        className="mood-input"
        placeholder="Write a quote, affirmation or thought..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className="primary-btn"
        onClick={handleSubmit}
      >
        + Add Card
      </button>

    </div>
  );
}

export default MoodInput;