import React, { useEffect, useState } from "react";
import ApiConnection from "../api/Api"; // Correct import to match the Axios constant

const TaskList = ({ filters }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    ApiConnection.get("/tasks") // Use ApiConnection for making the GET request
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  useEffect(() => {
    let updatedTasks = tasks;

    if (filters.status) {
      updatedTasks = updatedTasks.filter(
        (task) => task.status === filters.status
      );
    }

    if (filters.priority) {
      updatedTasks = updatedTasks.filter(
        (task) => task.priority === filters.priority
      );
    }

    if (filters.dueDate) {
      updatedTasks = updatedTasks.filter(
        (task) => new Date(task.dueDate) <= new Date(filters.dueDate)
      );
    }

    setFilteredTasks(updatedTasks);
  }, [filters, tasks]);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.status} - {task.priority}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
