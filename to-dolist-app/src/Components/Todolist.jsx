import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./Todolist.css";
import {
  BiCheckDouble,
  BiEdit,
  BiTrash,
  BiCheckCircle,
  BiReset,
  BiRefresh,
} from "react-icons/bi";

function Todolist() {
  const { date } = useParams(); // Get the selected date from the URL
  const navigate = useNavigate(); // For navigation

  const [todos, setTodos] = useState(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error("Error parsing localStorage todos:", error);
      return [];
    }
  });

  const [inputValue, setInputValue] = useState("");
  const [subject, setSubject] = useState(() => {
    try {
      const storedSubjects = localStorage.getItem("subjects");
      const subjects = storedSubjects ? JSON.parse(storedSubjects) : {};
      return subjects[date] || "";
    } catch (error) {
      console.error("Error parsing localStorage subjects:", error);
      return "";
    }
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [filter, setFilter] = useState("all"); // Filter state
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
      const storedSubjects = localStorage.getItem("subjects");
      const subjects = storedSubjects ? JSON.parse(storedSubjects) : {};
      subjects[date] = subject;
      localStorage.setItem("subjects", JSON.stringify(subjects));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [todos, subject, date]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      if (editIndex !== -1) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = {
          ...updatedTodos[editIndex],
          task: inputValue,
        };
        setTodos(updatedTodos);
        setInputValue("");
        setEditIndex(-1);
      } else {
        setTodos([...todos, { task: inputValue, completed: false, date }]);
        setInputValue("");
      }
    }
  };

  const editTodo = (index) => {
    setInputValue(filteredTodos[index].task);
    const globalIndex = todos.findIndex(
      (todo) => todo === filteredTodos[index]
    );
    setEditIndex(globalIndex);
  };

  const cancelEdit = () => {
    setInputValue("");
    setEditIndex(-1);
  };

  const removeTodo = (index) => {
    const globalIndex = todos.findIndex(
      (todo) => todo === filteredTodos[index]
    );
    const updatedTodos = todos.filter((_, i) => i !== globalIndex);
    setTodos(updatedTodos);
  };

  const toggleCompleted = (index) => {
    const globalIndex = todos.findIndex(
      (todo) => todo === filteredTodos[index]
    );
    const updatedTodos = [...todos];
    updatedTodos[globalIndex].completed =
      !updatedTodos[globalIndex].completed;
    setTodos(updatedTodos);
  };

  // Filter todos based on date and selected filter
  const filteredTodos = todos.filter((todo) => {
    if (todo.date !== date) return false;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true; // "all" filter
  });

  return (
    <div className="todo-container">
      <h1>Tasks for {date}</h1>
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="input-field"
        />
        {editIndex !== -1 ? (
          <>
            <button onClick={addTodo} className="update-btn">
              <BiCheckDouble />
            </button>
            <button onClick={cancelEdit} className="cancel-btn">
              <BiRefresh />
            </button>
          </>
        ) : (
          <button onClick={addTodo} className="add-btn">
            Add
          </button>
        )}
      </div>
      <div className="subject-filter-section">
        <label htmlFor="subject" className="subject-label">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
          className="subject-field"
        />
        <div className="filter-section">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span>{todo.task}</span>
            <div className="button-group">
              <button onClick={() => editTodo(index)} className="edit-btn">
                <BiEdit />
              </button>
              <button onClick={() => removeTodo(index)} className="delete-btn">
                <BiTrash />
              </button>
              <button
                onClick={() => toggleCompleted(index)}
                className="complete-btn"
              >
                {todo.completed ? <BiReset /> : <BiCheckCircle />}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* ✅ Save Button */}
      <div className="bottom-section">
        <button className="save-btn" onClick={() => navigate("/all-tasks")}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Todolist;