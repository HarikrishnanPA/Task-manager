import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";
import "./App.css";

const API_BASE_URL = "http://localhost:8080";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState(["Work", "Personal"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [initialCategorySet, setInitialCategorySet] = useState(false);

  useEffect(() => {
    const url = selectedCategory
      ? `${API_BASE_URL}/api/tasks?category=${selectedCategory}`
      : `${API_BASE_URL}/api/tasks`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [selectedCategory]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        const uniqueCategories = [...new Set(data.map((task) => task.category))];

        setCategories(uniqueCategories);

        // Automatically select the first category on load
        if (!initialCategorySet && uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]);
          setInitialCategorySet(true);
        }
      });
  }, []);

  const handleAddTask = (newTask) => setTasks([...tasks, newTask]);

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleToggleTaskStatus = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (error) {
      console.error("Failed to toggle task status", error);
    }
  };

  const handleAddCategory = (newCategory) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
    }
  };

  const filteredTasks = tasks.filter(
    (task) => task.category === selectedCategory
  );

  return (
    <div className={`app-wrapper ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddCategory={handleAddCategory}
        isOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="main-content">
        <header className="app-header">
          <h1 className="header-title">TaskManager</h1>
        </header>

        <div className="task-list-container">
          <TaskList
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onToggleDone={handleToggleTaskStatus}
          />
          <button
            className="add-task-button"
            onClick={() => setShowModal(true)}
          >
            +
          </button>
          {showModal && (
            <AddTaskModal
              category={selectedCategory}
              onClose={() => setShowModal(false)}
              onAdd={handleAddTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
