// src/components/SubNavbar.js
import React from "react";

const SubNavbar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <nav className="sub-navbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={selectedCategory === category ? "active" : ""}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default SubNavbar;
