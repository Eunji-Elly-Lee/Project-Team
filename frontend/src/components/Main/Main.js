import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "components/Main/Main.css";

function Main() {
  const [leftBalloonSrc, setLeftBalloonSrc] = useState("./assets/project_balloon01.png");
  const [rightBalloonSrc, setRightBalloonSrc] = useState("./assets/about_balloon01.png");
  const navigate = useNavigate();

  return (
    <div className="mainContainer">
      <div className="balloonContainer leftBalloon">
        <img
          className="balloon"
          src={leftBalloonSrc}
          onMouseOver={() => setLeftBalloonSrc("./assets/project_balloon02.png")}
          onMouseOut={() => setLeftBalloonSrc("./assets/project_balloon01.png")}
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
          onMouseOver={() => setRightBalloonSrc("./assets/about_balloon02.png")}
          onMouseOut={() => setRightBalloonSrc("./assets/about_balloon01.png")}
          onClick={() => navigate("/about")}
          alt="Kill the code balloon"
        />
      </div>
    </div>
  );
}

export default Main;
