import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import VacancyPage from "./VacancyPage";
import { RegisterPage, LoginPage } from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/vacancy/:id" component={VacancyPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
  