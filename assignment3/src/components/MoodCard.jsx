function MoodCard({ item, deleteMoodItem }) {
  return (
    <div className="mood-card">

      <div className="mood-text">
        {item.text}
      </div>

      <button
        className="danger-btn mood-delete-btn"
        onClick={() => deleteMoodItem(item.id)}
      >
        Delete
      </button>

    </div>
  );
}

export default MoodCard;