import { useState } from "react";

import "./Dashboard.css";

import TaskBoard from "./TaskBoard";
import GoalTracker from "./GoalTracker";
import MoodBoard from "./MoodBoard";
import FocusTimer from "./FocusTimer";
import Sidebar from "./Sidebar";

function Dashboard() {
  const [activeSection, setActiveSection] =
    useState("tasks");

  return (
    <>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="dashboard">

        <header className="dashboard-header">

          <h1>Welcome back</h1>

          <p>
            Your personal productivity OS
          </p>

        </header>

        {activeSection === "tasks" && (
          <TaskBoard />
        )}

        {activeSection === "goals" && (
          <GoalTracker />
        )}

        {activeSection === "mood" && (
          <MoodBoard />
        )}

        {activeSection === "focus" && (
          <FocusTimer />
        )}

      </main>
    </>
  );
}

export default Dashboard;