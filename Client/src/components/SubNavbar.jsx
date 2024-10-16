// src/components/SubNavbar.js
import React from "react";
import "./CSS/Database.css"
const SubNavbar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <>
      <nav className="sub-navbar subNav">
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
   
    </>
   
  );
};

export default SubNavbar;
