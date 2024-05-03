import React from "react";
import "./App.css";
import Homepage from "./pages/Homepage.js";

import Login from "./pages/Login/Login";
import Register from './pages/Login/Register';
function App() {
  return (
    <div className="App">
      <Login />
      <Register />
      {/* <Register /> */}
      {/* <Homepage /> */}
    </div>
  );
}

export default App;
