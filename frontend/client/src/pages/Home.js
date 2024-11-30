import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TaskList from "../components/TaskList";

const Home = () => {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    dueDate: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    console.log("Filters applied:", filters); // For debugging
  };

  return (
    <div className="content">
      <Header />
      <div className="main">
        <TaskList filters={filters} />
        <div className="filter">
          <form onSubmit={applyFilters}>
            <label>
              <p>Sort by task status:</p>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">Sort by all</option>
                <option value="open">Open</option>
                <option value="inprog">In Progress</option>
                <option value="comp">Completed</option>
                <option value="miss">Overdue</option>
              </select>
            </label>

            <label>
              <p>Sort by Priority level:</p>
              <select
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
              >
                <option value="">Sort by all</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>

            <label>
              <p>Sort by Due Date:</p>
              <input
                type="date"
                name="dueDate"
                value={filters.dueDate}
                onChange={handleFilterChange}
              />
            </label>

            <button type="submit">Apply Filters</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
