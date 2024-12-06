import React from "react";

const VacancyDetails = ({ vacancy }) => {
  return (
    <div className="vacancy-details">
      <h2>{vacancy.title}</h2>
      <p>{vacancy.fullDescription}</p>
      <p>Зарплата: {vacancy.salary}</p>
      <p>Контакты: {vacancy.contact}</p>
    </div>
  );
};

export default VacancyDetails;
