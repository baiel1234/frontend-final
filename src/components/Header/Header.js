import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>HeadHunter</h1>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/auth">Вход</Link>
      </nav>
    </header>
  );
};

export default Header;
