import React from 'react';
import GeneralPage from './pages/generalPage/generalPage';
import Navbar from './components/Navbar/Navbar';
import { ThemeProvider } from './themeContext';

function App() {
  return (
    <div className='App'>
      <ThemeProvider>
        <Navbar />
        <div className='h-80' style={{ marginTop: '80px' }}>
          <GeneralPage />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
