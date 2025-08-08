import React, { useReducer, useEffect } from "react";
import * as api from "../services/mock-api";
import type { Task } from "../services/mock-api";
import { TaskContext } from "./task-context";

type State = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Task[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string };

const initialState: State = {
  tasks: [],
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, tasks: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
}

export default function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch tasks on mount
  useEffect(() => {
    (async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const tasks = await api.getTasks();
        dispatch({ type: "FETCH_SUCCESS", payload: tasks });
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load tasks";
        dispatch({ type: "FETCH_ERROR", payload: message });
      }
    })();
  }, []);

  const addTask = async (taskData: Omit<Task, "id">) => {
    try {
      const newTask = await api.createTask(taskData);
      dispatch({ type: "ADD_TASK", payload: newTask });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to add task";
      dispatch({ type: "FETCH_ERROR", payload: message });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      dispatch({ type: "DELETE_TASK", payload: id });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to delete task";
      dispatch({ type: "FETCH_ERROR", payload: message });
    }
  };

  const contextValue = React.useMemo(
    () => ({ ...state, addTask, deleteTask }),
    [state]
  );

  return <TaskContext value={contextValue}>{children}</TaskContext>;
}
