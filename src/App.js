import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <BaseRouter />
      </Router>
    );
  }
}

export default App;
