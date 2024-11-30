import React, { useState } from "react";
import ApiConnection from "../api/Api"; // Axios instance
import Header from "../components/Header";
import Footer from "../components/Footer";

const TaskCreation = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "Medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiConnection.post("/tasks", formData);
      alert("Task created successfully!");
      console.log("Created Task:", response.data);
      setFormData({
        title: "",
        description: "",
        status: "open",
        priority: "Medium",
        dueDate: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task.");
    }
  };

  return (
    <div className="content">
      <Header /> {/* Include the Header */}
      <main className="main">
        <h1>Create a Task</h1>
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
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
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
          <button type="submit">Create Task</button>
        </form>
      </main>
      <Footer /> {/* Include the Footer */}
    </div>
  );
};

export default TaskCreation;
