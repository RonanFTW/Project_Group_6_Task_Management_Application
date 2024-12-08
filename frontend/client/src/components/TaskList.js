import React, { useEffect, useState } from "react";
import { DisTasks } from "../api/Api";
import TaskDisplay from "./TaskDisplay";
import TaskHandling from "./TaskHandling";
import "../App.css";

const TaskList = ({ filters }) => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await DisTasks();
      if (Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks);
      } else {
        console.error("Invalid task format:", fetchedTasks);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = () => {
    setSelectedTask(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  const handleTaskCreated = () => {
    setSuccessMessage("Task created successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
    fetchTasks();
  };

  useEffect(() => {
    let updatedTasks = tasks;

    if (filters.status) {
      const today = new Date().toISOString().split("T")[0];
      if (filters.status === "open") {
        updatedTasks = updatedTasks.filter(
          (task) => new Date(task.due_date).toISOString().split("T")[0] >= today
        );
      } else if (filters.status === "miss") {
        updatedTasks = updatedTasks.filter(
          (task) => new Date(task.due_date).toISOString().split("T")[0] < today
        );
      }
    }
    if (filters.priority) {
      updatedTasks = updatedTasks.filter(
        (task) => task.priority === filters.priority
      );
    }
    if (filters.due_date) {
      updatedTasks = updatedTasks.filter(
        (task) =>
          new Date(task.due_date).toISOString().split("T")[0] ===
          filters.due_date
      );
    }
    if (filters.assigned_to) {
      updatedTasks = updatedTasks.filter(
        (task) => task.assigned_to === parseInt(filters.assigned_to, 10)
      );
    }
    setFilteredTasks(updatedTasks);
  }, [tasks, filters]);

  return (
    <div className="main">
      <h2>Task List</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {filteredTasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks available.</p>
        </div>
      ) : (
        <div>
          {filteredTasks.map((task) => (
            <TaskDisplay
              key={task.id}
              task={task}
              edit={handleEdit}
              refresh={fetchTasks}
            />
          ))}
        </div>
      )}
      <div className="create-task-btn-container">
        <button onClick={handleCreate}>Create Task</button>
      </div>
      {showForm && (
        <TaskHandling
          task={selectedTask}
          close={() => setShowForm(false)}
          refresh={fetchTasks}
          onTaskCreated={handleTaskCreated}
        />
      )}
    </div>
  );
};

export default TaskList;
