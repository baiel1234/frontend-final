// src/pages/HomePage.js

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'; 

const HomePage = () => {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    // Получаем все вакансии с /vacancies-info
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

  return (
    <div>
      <h1>HeadHunter 0.1</h1>
      <p>Your platform for job opportunities</p>
      <div style={styles.buttonContainer}>
        <Link to="/auth/login">
          <button style={styles.button}>Login</button>
        </Link>
        <Link to="/auth/register">
          <button style={styles.button}>Register</button>
        </Link>
      </div>
      <h2>Vacancies</h2>
      {vacancies.length === 0 ? (
        <p>Loading vacancies...</p>
      ) : (
        <ul>
          {vacancies.map(vacancy => (
            <li key={vacancy.id}>
              <Link to={`/vacancies-info/${vacancy.id}`}>
                <h3>{vacancy.title}</h3>
                <p>{vacancy.description}</p>
                <p>Location: Bishkek</p>
                <p>Salary: {vacancy.salary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50', // Зеленый цвет для кнопок
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
};
export default HomePage;
