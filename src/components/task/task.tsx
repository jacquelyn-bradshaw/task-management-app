import React from "react";

interface TaskProps {
  task: {
    id: string;
    title: string;
    description?: string;
    isCompleted?: boolean;
    dueDate?: Date | undefined;
  };
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.isCompleted && <p>Completed</p>}
      {task.dueDate && (
        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}
    </li>
  );
};

export default Task;
