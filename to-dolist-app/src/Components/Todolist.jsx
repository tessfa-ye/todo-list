import React, { useState, useEffect, useRef } from "react";
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
  // Initialize todos state directly from localStorage
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

  // Save todos to localStorage when todos change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip the first render to avoid saving empty todos
    }
    try {
      console.log("Saving todos to localStorage:", todos);
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
          task: inputValue,
          completed: updatedTodos[editIndex].completed,
        };
        setTodos(updatedTodos);
        setInputValue("");
        setEditIndex(-1);
      } else {
        setTodos([...todos, { task: inputValue, completed: false }]);
        setInputValue("");
      }
    }
  };

  const editTodo = (index) => {
    setInputValue(todos[index].task);
    setEditIndex(index);
  };

  const cancelEdit = () => {
    setInputValue("");
    setEditIndex(-1);
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleCompleted = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
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
        {todos.map((todo, index) => (
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
    </div>
  );
}

export default Todolist;