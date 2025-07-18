import React from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import "./TaskListByDatePage.css";

function TaskListByDatePage() {
  const navigate = useNavigate();

  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  // Filter out todos without a valid date
  const filteredTodos = storedTodos.filter((todo) => todo.date && todo.date.trim() !== "");
  const uniqueDates = [...new Set(filteredTodos.map((todo) => todo.date))];

  const handleDateClick = (date) => {
    navigate(`/tasks/${date}`);
  };

  const handleBack = () => {
    navigate("/"); // go back home
  };

  return (
    <div className="todo-container">
      <div className="header">
        <button onClick={handleBack} className="back-button">
          <BiArrowBack />
        </button>
        <h1>📅 View Tasks by Date</h1>
      </div>

      {uniqueDates.length === 0 ? (
        <p>No saved tasks.</p>
      ) : (
        <ul className="todo-list">
          {uniqueDates.map((date) => (
            <li key={date} className="todo-item">
              <span>{date}</span>
              <button className="add-btn" onClick={() => handleDateClick(date)}>
                View Tasks
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskListByDatePage;
