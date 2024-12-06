import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [vacancies, setVacancies] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    expectations: '',
    tasks: '',
    offers: '',
    salary: '',
    vacancyId: '',
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/vacancies-info');
        setVacancies(response.data);
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      }
    };
    fetchVacancies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async (event) => {
    event.preventDefault(); // Prevent default form submit behavior
  
    try {
      const requestBody = {
        ...formData,
        expectations: formData.expectations.split(',').map((item) => item.trim()), // Trim whitespace
        tasks: formData.tasks.split(',').map((item) => item.trim()), // Trim whitespace
        offers: formData.offers.split(',').map((item) => item.trim()), // Trim whitespace
        salary: parseInt(formData.salary, 10),
        vacancyId: parseInt(formData.vacancyId, 10),
      };
  
      const response = await axios.post('http://localhost:5000/vacancies-info', requestBody);
      alert('Vacancy created successfully!');
  
      // Update local list of vacancies
      setVacancies((prev) => [...prev, response.data]);
      setShowForm(false); // Hide the form
      setFormData({
        title: '',
        description: '',
        expectations: '',
        tasks: '',
        offers: '',
        salary: '',
        vacancyId: '',
      }); // Clear the form
    } catch (error) {
      console.error('Error creating vacancy:', error);
      alert('Failed to create vacancy. Please try again.');
    }
  };

  return (
    <div>
      {/* Top Header */}
      <header className="header">
        <h1 className="logo">HeadHunter 0.1</h1>
        <div className="button-container">
          <Link to="/auth/login">
            <button className="button">Login</button>
          </Link>
          <Link to="/auth/register">
            <button className="button">Register</button>
          </Link>
          <button className="button" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Create Vacancy'}
          </button>
        </div>
      </header>

      {/* Form for creating vacancy */}
      {showForm && (
        <div className="form-container">
          <h2>Create New Vacancy</h2>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="input"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="input"
          />
          <input
            type="text"
            name="expectations"
            value={formData.expectations}
            onChange={handleInputChange}
            placeholder="Expectations (comma separated)"
            className="input"
          />
          <input
            type="text"
            name="tasks"
            value={formData.tasks}
            onChange={handleInputChange}
            placeholder="Tasks (comma separated)"
            className="input"
          />
          <input
            type="text"
            name="offers"
            value={formData.offers}
            onChange={handleInputChange}
            placeholder="Offers (comma separated)"
            className="input"
          />
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            placeholder="Salary"
            className="input"
          />
          <input
            type="number"
            name="vacancyId"
            value={formData.vacancyId}
            onChange={handleInputChange}
            placeholder="Vacancy ID"
            className="input"
          />
          <button type="submit" onClick={handleCreate} className="button">Create Vacancy</button>
        </div>
      )}

      {/* List of vacancies */}
      <h2>Vacancies</h2>
      {vacancies.length === 0 ? (
        <p>Loading vacancies...</p>
      ) : (
        <div className="vacancies-container">
          {vacancies.map((vacancy) => (
            <div key={vacancy.id} className="vacancy-card">
              <Link to={`/vacancies-info/${vacancy.id}`}>
                <h3>{vacancy.title}</h3>
                <p>{vacancy.description}</p>
                <p>Location: Bishkek</p>
                <p>Salary: {vacancy.salary}</p>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Bottom black header */}
      <footer className="footer">
        <p className="footer-text">All rights reserved. HeadHunter 2024</p>
      </footer>
    </div>
  );
};

export default HomePage;
