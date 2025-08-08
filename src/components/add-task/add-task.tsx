import React, { useState, use } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import Input from "../input/input";
import { TaskContext } from "../../store/task-context";

const AddTask: React.FC = () => {
  const { addTask } = use(TaskContext) || {};
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const handleAdd = () => {
    if (addTask && title) {
      addTask({
        title,
        description,
        dueDate: dueDate ?? undefined,
        isCompleted: false,
      });
      setTitle("");
      setDescription("");
      setDueDate(null);
      navigate("/");
    }
  };

  return (
    <form>
      <h2>Add Task</h2>
      <Input
        label="Title"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        isRequired
      />
      <Input
        label="Description"
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        isRequired={false}
      />
      <Input
        label="Due Date"
        placeholder="Enter due date (optional)"
        value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
        onChange={(e) =>
          setDueDate(e.target.value ? new Date(e.target.value) : null)
        }
        isRequired={false}
        type="date"
      />
      <Button text="Add" onClick={handleAdd} />
      <Button text="Cancel" onClick={() => navigate("/")} />
    </form>
  );
};

export default AddTask;
