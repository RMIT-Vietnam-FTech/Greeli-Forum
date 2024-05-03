import { useContext } from "react";
import { DarkThemeContext } from "../DarkThemeContext";
import { useState } from "react";
import Container from "react-bootstrap/Container";
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
        <div>

        <DarkThemeContext.Provider value={darkTheme}>
          {children}
        </DarkThemeContext.Provider>
        </div>
      </Container>
    </>
  );
}
