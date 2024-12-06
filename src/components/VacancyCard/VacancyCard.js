import React from "react";
import { Link } from "react-router-dom";

const VacancyCard = ({ vacancy }) => {
  return (
    <div className="vacancy-card">
      <h3>{vacancy.title}</h3>
      <p>{vacancy.description}</p>
      <p>Локация: {vacancy.location}</p>
      <Link to={`/vacancy/${vacancy.id}`}>Подробнее</Link>
    </div>
  );
};

export default VacancyCard;
