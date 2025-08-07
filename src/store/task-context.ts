import React from "react";
import type { Task } from "../services/mock-api";

type State = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
};

export type TaskContextType = State;

export const TaskContext = React.createContext<TaskContextType | undefined>(
  undefined
);
