import { Routes, Route, useNavigate } from "react-router-dom";
import TaskProvider from "./store/task-reducer";
import Tasks from "./components/tasks/tasks";
import AddTask from "./components/add-task/add-task";
import "./App.css";
import Button from "./components/button/button";

function App() {
  const navigate = useNavigate();

  return (
    <TaskProvider>
      <h1>Task Management App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Tasks />
              <Button text="Add New Task" onClick={() => navigate("/add")} />
            </>
          }
        />
        <Route path="add" element={<AddTask />} />
      </Routes>
    </TaskProvider>
  );
}

export default App;
