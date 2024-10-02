// src/services/apiService.js
const API_URL = "http://localhost:3001/api/records"; // Check if this matches your backend server URL

const apiService = {
  addFileRecord: async (record) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add record");
      }

      return await response.json(); // Ensure you await here to get the response
    } catch (error) {
      console.error('Error in addFileRecord:', error); // Log the error for debugging
      throw error; // Rethrow to handle it in the calling function
    }
  },
};


export default apiService;
