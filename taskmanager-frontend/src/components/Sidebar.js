import React, { useState } from "react";
import "../styles/Sidebar.css";
import toggleIcon from "../assets/split-screen.png";


const Sidebar = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // for collapsing

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      onAddCategory(newCategory.trim());
      setNewCategory("");
      setShowInput(false);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
      {/* This toggle button is always visible */}
      <button className="sidebar-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <img src={toggleIcon} alt="Toggle Sidebar" className="toggle-icon" />
      </button>

      {/* This content is hidden when collapsed */}
      {isOpen && (
        <div className="sidebar-content">
          <h2>Categories</h2>
          <ul className="category-list">
            {categories.map((cat) => (
              <li
                key={cat}
                className={cat === selectedCategory ? "active" : ""}
                onClick={() => onSelectCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
          {showInput ? (
            <div className="add-category-form">
              <input
                type="text"
                className="category-input"
                placeholder="New category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <div className="button-row">
                <button className="btn add-btn" onClick={handleAddCategory}>Add</button>
                <button className="btn cancel-btn" onClick={() => {
                  setShowInput(false);
                  setNewCategory("");
                }}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className="add-category" onClick={() => setShowInput(true)}>
              + New category
            </button>
          )}

        </div>
      )}
    </div>
  );
};

export default Sidebar;
