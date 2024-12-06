// src/pages/VacancyPage.js

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const VacancyPage = () => {
  const { vacancyId } = useParams(); // Получаем ID вакансии из URL
  const [vacancyInfo, setVacancyInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    expectations: [],
    tasks: [],
    offers: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVacancyInfo = async () => {
      try {
        // Получаем информацию о вакансии по ID
        const response = await axios.get(`http://localhost:5000/vacancies-info/${vacancyId}`);
        setVacancyInfo(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          salary: response.data.salary,
          expectations: response.data.expectations,
          tasks: response.data.tasks,
          offers: response.data.offers
        });
      } catch (error) {
        console.error("Error fetching vacancy info:", error);
      }
    };

    fetchVacancyInfo();
  }, [vacancyId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/vacancies-info/${vacancyId}`);
      alert('Vacancy deleted successfully!');
      navigate('/'); // Возврат на главную страницу после удаления
    } catch (error) {
      console.error("Error deleting vacancy:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.patch(`http://localhost:5000/vacancies-info/${vacancyId}`, formData);
      alert('Vacancy updated successfully!');
      setIsEditing(false); // Закрываем режим редактирования
      setVacancyInfo({ ...vacancyInfo, ...formData }); // Обновляем локальные данные
    } catch (error) {
      console.error("Error updating vacancy:", error);
    }
  };

  if (!vacancyInfo) {
    return <div>Loading...</div>; // Показать индикатор загрузки
  }

  return (
    <div>
      {!isEditing ? (
        <>
          <h1>{vacancyInfo.title}</h1>
          <p>{vacancyInfo.description}</p>
          <p>Salary: {vacancyInfo.salary}</p>
          <h2>Details</h2>
          <p>Expectations: {vacancyInfo.expectations.join(", ")}</p>
          <p>Tasks: {vacancyInfo.tasks.join(", ")}</p>
          <p>Offers: {vacancyInfo.offers.join(", ")}</p>

          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <>
          <h1>Edit Vacancy</h1>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>
          <div>
            <label>Salary:</label>
            <input
              type="number"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            />
          </div>
          <div>
            <label>Expectations (comma-separated):</label>
            <input
              type="text"
              value={formData.expectations.join(", ")}
              onChange={(e) => setFormData({ ...formData, expectations: e.target.value.split(", ") })}
            />
          </div>
          <div>
            <label>Tasks (comma-separated):</label>
            <input
              type="text"
              value={formData.tasks.join(", ")}
              onChange={(e) => setFormData({ ...formData, tasks: e.target.value.split(", ") })}
            />
          </div>
          <div>
            <label>Offers (comma-separated):</label>
            <input
              type="text"
              value={formData.offers.join(", ")}
              onChange={(e) => setFormData({ ...formData, offers: e.target.value.split(", ") })}
            />
          </div>
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default VacancyPage;
