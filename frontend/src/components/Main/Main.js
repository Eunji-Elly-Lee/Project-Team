import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themeActions } from "../../redux/themeSlice";
import "components/Main/Main.css";

function Main() {
  const P_B_SRC01 = "./assets/project_balloon01.png";
  const P_B_SRC02 = "./assets/project_balloon02.png";
  const A_B_SRC01 = "./assets/about_balloon01.png";
  const A_B_SRC02 = "./assets/about_balloon02.png";
  const [leftBalloonSrc, setLeftBalloonSrc] = useState(P_B_SRC01);
  const [rightBalloonSrc, setRightBalloonSrc] = useState(A_B_SRC01);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(themeActions.darkTheme());
  }, [dispatch]);

  return (
    <div className="mainContainer">
      <div className="balloonContainer leftBalloon">
        <img
          className="balloon"
          src={leftBalloonSrc}
          onMouseOver={() => setLeftBalloonSrc(P_B_SRC02)}
          onMouseOut={() => setLeftBalloonSrc(P_B_SRC01)}
          onClick={() => navigate("/projects")}
          alt="Kill the code balloon"
        />
      </div>
      <div className="mainMessage">
        We are here
        <br />
        <span>to create projects</span> <br />
        and keep developing <br />
        something creative.
      </div>
      <div className="balloonContainer">
        <img
          className="balloon"
          src={rightBalloonSrc}
          onMouseOver={() => setRightBalloonSrc(A_B_SRC02)}
          onMouseOut={() => setRightBalloonSrc(A_B_SRC01)}
          onClick={() => navigate("/about")}
          alt="About balloon"
        />
      </div>
    </div>
  );
}

export default Main;
