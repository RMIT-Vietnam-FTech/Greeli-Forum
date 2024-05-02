import logo from './logo.svg';
import './App.css';

import Login from "./pages/Login/Login";
import Register from './pages/Login/Register';
function App() {
  return (
    <div className="App">
      <Login />
      <Register />
      {/* <Register /> */}
    </div>
  );
}

export default App;
