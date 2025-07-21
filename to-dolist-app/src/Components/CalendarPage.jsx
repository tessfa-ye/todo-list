import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CalendarPage.css";

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const handleGoToTasks = () => {
    if (selectedDate) {
      navigate(`/tasks/${selectedDate}`);
    } else {
      alert("Please select a date.");
    }
  };

  const handleViewAll = () => {
    navigate("/all-tasks");
  };

  return (
    <div className="calendar-container">
      <h1>📅 Plan Your Tasks</h1>
      <h3> First please select a date to add your tasks</h3>
      <input
        type="date"
        className="calendar-input"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleGoToTasks} className="calendar-btn">
          Add Task for Selected Date
        </button>
        <button onClick={handleViewAll} className="calendar-btn">
          View All Saved Dates
        </button>
      </div>
    </div>
  );
}

export default CalendarPage;