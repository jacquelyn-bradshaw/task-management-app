import React from "react";
import "./task.css";

interface TaskProps {
  task: {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
    dueDate?: Date;
  };
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <li>
      <h3>{task.title}</h3>
      <div className="task-details">
        <div className="task-description">
          <p>{task.description}</p>
          {task.isCompleted && (
            <span className="completed-icon" aria-label="Completed" role="img">
              ✅
            </span>
          )}
        </div>
        {task.dueDate && (
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        )}
      </div>
    </li>
  );
};

export default Task;
