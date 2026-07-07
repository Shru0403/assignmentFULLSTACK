import "./Sidebar.css";

function Sidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    { id: "tasks", icon: "📝", label: "Tasks" },
    { id: "goals", icon: "🎯", label: "Goals" },
    { id: "mood", icon: "✨", label: "Mood Board" },
    { id: "focus", icon: "⏱", label: "Focus Timer" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">

        <h1>Cipher</h1>

        <p>Your Productivity OS</p>

      </div>

      <nav className="menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={
              activeSection === item.id
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => setActiveSection(item.id)}
          >
            <span className="menu-icon">
              {item.icon}
            </span>

            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;