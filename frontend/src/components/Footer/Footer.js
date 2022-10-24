import { Link } from "react-router-dom";
import "components/Footer/Footer.css";

function Footer({
  lightTheme,
}) {
  return (
    <footer className={lightTheme ? "lightFooter" : "darkFooter"}>
      <div className="footerRow">
        <div className="footerLogo">
          <Link to="/">
            <img
              src={lightTheme ? "./assets/logo_black.gif" : "./assets/logo_white.gif"}
              alt="logo"
            />
          </Link>
        </div>
        <div className="contactUs">
          <Link to="#">
            Contact Us
          </Link>
        </div>
      </div>
      <p> copyright &copy;2022 Team KillTheCode</p>
    </footer>
  );
}

export default Footer;
