import React, { useState } from "react";
import ApiConnection, { GetUsers } from "../api/Api"; // Axios instance for API calls

const TaskHandling = ({ task, close, refresh }) => {
  // Initialize form state based on whether task is for creation or editing
  const [formData, setFormData] = useState({
    title: task ? task.title : "",
    description: task ? task.description : "",
    status: task ? task.status : "open",
    priority: task ? task.priority : "Medium",
    dueDate: task ? task.dueDate : "",
    assigned_to: task ? task.assigned_to : "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
        const fetchUsers = async () => {
            try {
                const uList = await GetUsers();
                setUsers(uList);
            } catch (err) {
                console.error('Where are they?', err);
            }
        };
        fetchUsers();
    }, []);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit form (create or edit task)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        // Update an existing task
        await ApiConnection.put(`/tasks/${task.id}`, formData);
        alert("Task updated successfully!");
      } else {
        // Create a new task
        await ApiConnection.post("/tasks", formData);
        alert("Task created successfully!");
      }
      refresh(); // Notify parent component to refresh the task list
      if (close) close(); // Close the form/modal if a close function is provided
    } catch (error) {
      console.error("Error handling task:", error);
      setErrorMessage("Failed to save the task. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="open">Open</option>
            <option value="inprog">In Progress</option>
            <option value="comp">Completed</option>
          </select>
        </div>
        <div>
          <label>Priority:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Assign Task To:</label>
            <select name="assigned_to" 
                value={formData.assigned_to} 
                onChange={handleChange}
                required
            >
                <option value="">All Users</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                ))}
            </select>
        </div>
        <button type="submit">{task ? "Update Task" : "Create Task"}</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default TaskHandling;
