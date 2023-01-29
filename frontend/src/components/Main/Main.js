import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../redux/themeSlice";
import Working from "components/Working/Working";
import "components/Main/Main.css";

function Main() {
  const PBSRC01 = "./assets/project_balloon01.png";
  const PBSRC02 = "./assets/project_balloon02.png";
  const ABSRC01 = "./assets/about_balloon01.png";
  const ABSRC02 = "./assets/about_balloon02.png";
  const [leftBalloonSrc, setLeftBalloonSrc] = useState(PBSRC01);
  const [rightBalloonSrc, setRightBalloonSrc] = useState(ABSRC01);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(themeActions.darkTheme());
  }, [dispatch]);

  return (
    <>
    {user ? (
      <Working />
    ) : (
      <div className="mainContainer">
        <div className="balloonContainer leftBalloon">
          <img
            className="balloon"
            src={leftBalloonSrc}
            onMouseOver={() => setLeftBalloonSrc(PBSRC02)}
            onMouseOut={() => setLeftBalloonSrc(PBSRC01)}
            onClick={() => navigate("/projects")}
            alt="Kill the code balloon"
          />
        </div>
        <div className="mainMessage">
            We are here to <br />
            <span>create project</span> <br />
            and keep developing <br />
            something creative.
        </div>
        <div className="balloonContainer">
          <img
            className="balloon"
            src={rightBalloonSrc}
            onMouseOver={() => setRightBalloonSrc(ABSRC02)}
            onMouseOut={() => setRightBalloonSrc(ABSRC01)}
            onClick={() => navigate("/about")}
            alt="About balloon"
          />
        </div>
      </div>
    )}
    </>
  );
}

export default Main;
