// components/TaskList.js
import React from "react";
import TaskCard from "./TaskCard";
import "../styles/TaskList.css";

const TaskList = ({ tasks, onDelete, onToggleDone }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleDone={onToggleDone}
        />
      ))}
    </div>
  );
};

export default TaskList;