import React, { use } from "react";
import { TaskContext } from "../../store/task-context";
import Task from "../task/task";

const Tasks: React.FC = () => {
  const context = use(TaskContext);

  if (!context) {
    return <div>Tasks not available.</div>;
  }

  const { tasks, loading, error } = context;

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <div>No tasks found.</div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <Task key={task.id} task={{ ...task }} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
