import { useContext } from "react";
import { DarkThemeContext } from "../contexts/DarkThemeContext";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
export default function ForumPage({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);
  function toggleTheme() {
    setDarkTheme((darkTheme) => !darkTheme);
  }
  if (darkTheme) {
    document.body.style.backgroundColor = "#0A2A28";
  } else {
    document.body.style.backgroundColor = "white";
  }
  return (
    <>
      <button onClick={toggleTheme}>toggle Theme</button>
      <Container className="forum d-lg-flex justify-content-between align-items-start">
        <DarkThemeContext.Provider value={darkTheme}>
          {children}
        </DarkThemeContext.Provider>
      </Container>
    </>
  );
}
