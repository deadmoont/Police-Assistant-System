import React from 'react';
import FileRecord from './FileRecord';

const CategoryTab = ({ selectedCategory }) => {
  return (
    <div>
      <div className="category-header">
        <h2>{selectedCategory} Records</h2>
      </div>
      <FileRecord category={selectedCategory} />
    </div>
  );
};

export default CategoryTab;
