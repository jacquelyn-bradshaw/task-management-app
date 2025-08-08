import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import AddTask from "./add-task";
import { TaskContext } from "../../store/task-context";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AddTask", () => {
  const addTask = jest.fn();
  const deleteTask = jest.fn();

  function renderComponent() {
    render(
      <TaskContext
        value={{
          addTask,
          deleteTask,
          tasks: [],
          loading: false,
          error: null,
        }}
      >
        <MemoryRouter>
          <AddTask />
        </MemoryRouter>
      </TaskContext>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input fields and buttons", () => {
    renderComponent();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  it("shows error if title is empty", () => {
    renderComponent();
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(addTask).not.toHaveBeenCalled();
  });

  it("shows error if title is too long", () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "a".repeat(101) },
    });
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    expect(
      screen.getByText(/Title must be less than 100 characters/i)
    ).toBeInTheDocument();
    expect(addTask).not.toHaveBeenCalled();
  });

  it("shows error if description is too long", () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Valid Title" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "a".repeat(501) },
    });
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    expect(
      screen.getByText(/Description must be less than 500 characters/i)
    ).toBeInTheDocument();
    expect(addTask).not.toHaveBeenCalled();
  });

  it("calls addTask and navigates on valid input", () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Valid Title" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Valid Description" },
    });
    const addButton = screen.getByTestId("add-button");
    fireEvent.click(addButton);
    expect(addTask).toHaveBeenCalledWith({
      title: "Valid Title",
      description: "Valid Description",
      dueDate: undefined,
      isCompleted: false,
    });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("navigates to home on cancel", () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
