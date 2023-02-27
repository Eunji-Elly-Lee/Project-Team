import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "components/NavBar/NavBar";
import Main from "components/Main/Main";
import Projects from "components/Projects/Projects";
import Working from "components/Working/Working";
import SignIn from "components/SignIn/SignIn";
import Forgot from "components/Forgot/Forgot";
import Reset from "components/Reset/Reset";
import JoinUs from "components/JoinUs/JoinUs";
import JoinUsVerification from "components/JoinUs/JoinUsVerification";
import Footer from "components/Footer/Footer";
import "App.css";

function App() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme ? "lightApp" : "darkApp"}>
      <Router>
        <NavBar lightTheme={theme} />
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Main />} />
          <Route
            basename={process.env.PUBLIC_URL}
            path="/projects"
            element={<Projects />}
          />
          <Route
            basename={process.env.PUBLIC_URL}
            path="/working"
            element={<Working />}
          />
          <Route
            basename={process.env.PUBLIC_URL}
            path="/signin"
            element={<SignIn />}
          />
          <Route
            basename={process.env.PUBLIC_URL}
            path="/forgot"
            element={<Forgot />}
          />
          <Route
            basename={process.env.PUBLIC_URL}
            path="/reset"
            element={<Reset />}
          />
          <Route
            basename={process.env.PUBLIC_URL}
            path="/joinus"
            element={<JoinUs />}
          />
          <Route
            basename={process.env.PUBLIC_URL}
            path="/joinus/verification"
            element={<JoinUsVerification />}
          />
        </Routes>
        <Footer lightTheme={theme} />
      </Router>
    </div>
  );
}

export default App;
