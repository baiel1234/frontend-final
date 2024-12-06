import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // Стили

const AuthPage = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(2); // По умолчанию "Работодатель"
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:5000/auth/login"
        : "http://localhost:5000/auth/register";
      
      const data = isLogin
        ? { email, password }
        : { email, password, roleId: role };

      await axios.post(url, data);
      alert(isLogin ? "Вы успешно вошли!" : "Регистрация успешна!");
      navigate("/"); // Перенаправление на главную страницу
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <h1>{isLogin ? "Логин" : "Регистрация"}</h1>
      </header>

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </label>
        <br />
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </label>
        <br />
        {!isLogin && (
          <label>
            Роль:
            <select value={role} onChange={(e) => setRole(Number(e.target.value))} className="input-field">
              <option value={1}>Админ</option>
              <option value={2}>Работодатель</option>
              <option value={3}>Искатель работы</option>
            </select>
          </label>
        )}
        <br />
        <button type="submit" className="submit-button">{isLogin ? "Войти" : "Зарегистрироваться"}</button>
      </form>

      <footer className="auth-footer">
        <p>&copy; All rights reserved. HeadHunter 2024</p>
      </footer>
    </div>
  );
};

export const LoginPage = () => <AuthPage isLogin={true} />;
export const RegisterPage = () => <AuthPage isLogin={false} />;
