// components/TaskCard.js
import React from "react";
import "../styles/TaskCard.css";

const formatDeadlineWithTime = (dateStr, timeStr) => {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (!timeStr) return formattedDate;

  const [hour, minute] = timeStr.split(":");
  const timeDate = new Date();
  timeDate.setHours(hour, minute);
  const formattedTime = timeDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} at ${formattedTime}`;
};

const TaskCard = ({ task, onDelete, onToggleDone }) => {
  const formattedDeadline = new Date(task.deadline).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const isOverdue = new Date(`${task.deadline}T${task.time}`) < new Date();

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className="task-deadline">{formatDeadlineWithTime(task.deadline, task.time)}</span>
      </div>

      <div className="task-desc">{task.description}</div>

      <div className="task-footer">
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          <img src={require('../assets/delete-icon.png')} alt="Delete" className="delete-icon" />
        </button>
        <label className="done-label">
          {isOverdue ? (
            <span className="overdue-mark">❌</span>
          ) : (
            <>
              Done
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleDone(task.id)}
              />
            </>
          )}
        </label>
      </div>
    </div>

  );
};

export default TaskCard;
