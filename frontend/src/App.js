import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "components/NavBar/NavBar";
import Main from "components/Main/Main";
import "App.css";

function App() {
  const [lightTheme, setLightTheme] = useState(false);
  const [userLogin, setUserLogin] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(true);

  return (
    <div className={lightTheme ? "lightApp" : "darkApp"}>
      <Router>
        <NavBar lightTheme={lightTheme} userLogin={userLogin} isUserAdmin={isUserAdmin}/>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
