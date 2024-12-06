import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './VacancyPage.css';

const VacancyPage = () => {
  const { vacancyId } = useParams();
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
      navigate('/');
    } catch (error) {
      console.error("Error deleting vacancy:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.patch(`http://localhost:5000/vacancies-info/${vacancyId}`, formData);
      alert('Vacancy updated successfully!');
      setIsEditing(false);
      setVacancyInfo({ ...vacancyInfo, ...formData });
    } catch (error) {
      console.error("Error updating vacancy:", error);
    }
  };

  if (!vacancyInfo) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="vacancy-page">
      <header className="header">
        <h1>Vacancy Details</h1>
      </header>

      <div className="vacancy-content">
        {!isEditing ? (
          <div className="vacancy-details">
            <h2 className="vacancy-title">{vacancyInfo.title}</h2>
            <p className="vacancy-description">{vacancyInfo.description}</p>
            <p className="vacancy-salary">Salary: <span>{vacancyInfo.salary}</span></p>
            <h3>Details</h3>
            <p><strong>Expectations:</strong> {vacancyInfo.expectations.join(", ")}</p>
            <p><strong>Tasks:</strong> {vacancyInfo.tasks.join(", ")}</p>
            <p><strong>Offers:</strong> {vacancyInfo.offers.join(", ")}</p>

            <div className="buttons">
              <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
              <button onClick={handleDelete} className="delete-button">Delete</button>
            </div>
          </div>
        ) : (
          <div className="vacancy-form">
            <h2>Edit Vacancy</h2>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
              ></textarea>
            </div>
            <div className="form-group">
              <label>Salary:</label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Expectations (comma-separated):</label>
              <input
                type="text"
                value={formData.expectations.join(", ")}
                onChange={(e) => setFormData({ ...formData, expectations: e.target.value.split(", ") })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Tasks (comma-separated):</label>
              <input
                type="text"
                value={formData.tasks.join(", ")}
                onChange={(e) => setFormData({ ...formData, tasks: e.target.value.split(", ") })}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Offers (comma-separated):</label>
              <input
                type="text"
                value={formData.offers.join(", ")}
                onChange={(e) => setFormData({ ...formData, offers: e.target.value.split(", ") })}
                className="input-field"
              />
            </div>
            <div className="buttons">
              <button onClick={handleEdit} className="save-button">Save</button>
              <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>&copy; All rights reserved. HeadHunter 2024</p>
      </footer>
    </div>
  );
};

export default VacancyPage;
