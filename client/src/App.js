import logo from './logo.svg';
import './App.css';
import './sass/custom.css'
import Register from './pages/Register';
import Login from './pages/Login';
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
