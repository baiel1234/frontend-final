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
    event.preventDefault(); // Предотвращаем перезагрузку страницы при сабмите формы
  
    try {
      const requestBody = {
        ...formData,
        expectations: formData.expectations.split(',').map((item) => item.trim()), // Убираем лишние пробелы
        tasks: formData.tasks.split(',').map((item) => item.trim()), // Убираем лишние пробелы
        offers: formData.offers.split(',').map((item) => item.trim()), // Убираем лишние пробелы
        salary: parseInt(formData.salary, 10),
        vacancyId: parseInt(formData.vacancyId, 10),
      };
  
      const response = await axios.post('http://localhost:5000/vacancies-info', requestBody);
      alert('Vacancy created successfully!');
  
      // Обновляем локальный список вакансий
      setVacancies((prev) => [...prev, response.data]);
      setShowForm(false); // Скрываем форму
      setFormData({
        title: '',
        description: '',
        expectations: '',
        tasks: '',
        offers: '',
        salary: '',
        vacancyId: '4',
      }); // Очищаем форму
    } catch (error) {
      console.error('Error creating vacancy:', error);
      alert('Failed to create vacancy. Please try again.');
    }
  };
  

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
        <button style={styles.button} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create Vacancy'}
        </button>
      </div>

      {showForm && (
        <div style={styles.formContainer}>
          <h2>Create New Vacancy</h2>
          <input
    type="text"
    name="title"
    value={formData.title}
    onChange={handleInputChange}
    placeholder="Title"
  />
  <textarea
    name="description"
    value={formData.description}
    onChange={handleInputChange}
    placeholder="Description"
  />
  <input
    type="text"
    name="expectations"
    value={formData.expectations}
    onChange={handleInputChange}
    placeholder="Expectations (comma separated)"
  />
  <input
    type="text"
    name="tasks"
    value={formData.tasks}
    onChange={handleInputChange}
    placeholder="Tasks (comma separated)"
  />
  <input
    type="text"
    name="offers"
    value={formData.offers}
    onChange={handleInputChange}
    placeholder="Offers (comma separated)"
  />
  <input
    type="number"
    name="salary"
    value={formData.salary}
    onChange={handleInputChange}
    placeholder="Salary"
  />
  <input
    type="number"
    name="vacancyId"
    value={formData.vacancyId}
    onChange={handleInputChange}
    placeholder="Vacancy ID"
  />
  <button type="submit" onClick={handleCreate}>Create Vacancy</button>
        </div>
      )}

      <h2>Vacancies</h2>
      {vacancies.length === 0 ? (
        <p>Loading vacancies...</p>
      ) : (
        <ul>
          {vacancies.map((vacancy) => (
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
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  formContainer: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '400px',
    margin: '0 auto',
  },
};

export default HomePage;
