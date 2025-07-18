import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarPage from "./Components/CalendarPage";
import Todolist from "./Components/Todolist";
import TaskListByDatePage from "./Components/TaskListByDatePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/tasks/:date" element={<Todolist />} />
          <Route path="/all-tasks" element={<TaskListByDatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;