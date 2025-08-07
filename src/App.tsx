import TaskProvider from "./store/task-reducer";
import Tasks from "./components/tasks/tasks";
import "./App.css";

function App() {
  return (
    <TaskProvider>
      <h1>Task Management App</h1>
      <div>
        <Tasks />
      </div>
    </TaskProvider>
  );
}

export default App;
