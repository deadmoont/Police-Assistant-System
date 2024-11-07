// personnelService.js

let personnelData = []; // Simulated database

export const getPersonnel = async () => {
  return personnelData;
};

export const addPersonnelService = async (newPerson) => {
  personnelData.push(newPerson);
};

export const updatePersonnelStatus = async (id, newStatus) => {
  const person = personnelData.find((p) => p.id === id);
  if (person) {
    person.status = newStatus;
  }
};

export const updatePersonnel = async (updatedPerson) => {
  const index = personnelData.findIndex((p) => p.id === updatedPerson.id);
  if (index !== -1) {
    personnelData[index] = updatedPerson; // Update the person in the simulated database
  }
};

export const resetAllPersonnelStatus = async () => {
  personnelData = personnelData.map((person) => ({
    ...person,
    status: "Absent",
  }));
};
