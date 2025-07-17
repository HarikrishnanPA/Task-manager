// components/AddTaskModal.js
import React, { useState } from "react";
import "../styles/AddTaskModal.css";

const AddTaskModal = ({ category, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Split datetime-local into separate date and time
    const [date, time] = deadline.split("T");

    const newTask = {
      title,
      description,
      deadline: date,
      time: time,
      category,
      completed: false,
    };

    try {
      const response = await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const savedTask = await response.json();
      onAdd(savedTask);
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="add-task-modal-header">NEW TASK !</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
