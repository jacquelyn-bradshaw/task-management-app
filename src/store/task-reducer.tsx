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
  | { type: "FETCH_ERROR"; payload: string };

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
        const message =
          e instanceof Error ? e.message : "An unknown error occurred";
        dispatch({ type: "FETCH_ERROR", payload: message });
      }
    })();
  }, []);

  const contextValue = React.useMemo(() => ({ ...state }), [state]);

  return <TaskContext value={contextValue}>{children}</TaskContext>;
}
