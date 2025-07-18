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
  const [editIndex, setEditIndex] = useState(-1);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [todos]);

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

  const filteredTodos = todos.filter((todo) => todo.date === date);

  return (
    <div className="todo-container">
      <h1>To-Do List for {date}</h1>
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
