import React, { use } from "react";
import Button from "../button/button";
import { TaskContext } from "../../store/task-context";
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
  const context = use(TaskContext);

  if (!context) return null;

  const { deleteTask } = context;

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
      <Button text="Delete" onClick={() => deleteTask(task.id)} />
    </li>
  );
};

export default Task;
