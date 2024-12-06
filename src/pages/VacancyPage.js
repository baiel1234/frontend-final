// src/pages/VacancyPage.js

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const VacancyPage = () => {
  const { vacancyId } = useParams();  // Получаем ID вакансии из URL
  const [vacancyInfo, setVacancyInfo] = useState(null);

  useEffect(() => {
    const fetchVacancyInfo = async () => {
      try {
        // Получаем информацию о вакансии по ID
        const response = await axios.get(`http://localhost:5000/vacancies-info/${vacancyId}`);
        setVacancyInfo(response.data);
      } catch (error) {
        console.error("Error fetching vacancy info:", error);
      }
    };

    fetchVacancyInfo();
  }, [vacancyId]);

  if (!vacancyInfo) {
    return <div>Loading...</div>;  // Показать индикатор загрузки
  }

  return (
    <div>
      <h1>{vacancyInfo.title}</h1>
      <p>{vacancyInfo.description}</p>
      <p>Location: Bishkek</p>
      <p>Salary: {vacancyInfo.salary}</p>

      <h2>Detailed Information</h2>
      <p>Expectations: {vacancyInfo.expectations.join(", ")}</p>
      <p>Tasks: {vacancyInfo.tasks.join(", ")}</p>
      <p>Offers: {vacancyInfo.offers.join(", ")}</p>
    </div>
  );
};

export default VacancyPage;
