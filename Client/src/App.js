import React, { useState } from "react";
import CategoryTab from "./components/CategoryTab";
import "./styles/App.css";

const categories = ["Theft", "Assault", "Fraud", "Missing Persons"];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("Theft");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <ul>
          {categories.map((category) => (
            <li key={category} onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          ))}
        </ul>
      </nav>

      <div className="container">
        <h1>Police Records Management</h1>
        <CategoryTab selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default App;
