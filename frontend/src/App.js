import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "components/NavBar/NavBar";
import Main from "components/Main/Main";
import Footer from "components/Footer/Footer";
import "App.css";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(true);  
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme ? "lightApp" : "darkApp"}>
      <Router>
        <NavBar lightTheme={theme} userLogin={userLogin} isUserAdmin={isUserAdmin}/>
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Main />} />
        </Routes>
        <Footer lightTheme={theme} />
      </Router>
    </div>
  );
}

export default App;
