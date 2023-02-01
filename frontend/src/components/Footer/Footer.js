import { Link } from "react-router-dom";
import "components/Footer/Footer.css";

function Footer({ lightTheme }) {
  const L_B_SRC = "./assets/logo_black.gif";
  const L_W_SRC = "./assets/logo_white.gif";

  return (
    <footer className={lightTheme ? "lightFooter" : "darkFooter"}>
      <div className="footerRow">
        <div className="footerLogo">
          <Link to="/">
            <img
              src={lightTheme ? L_B_SRC : L_W_SRC}
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
