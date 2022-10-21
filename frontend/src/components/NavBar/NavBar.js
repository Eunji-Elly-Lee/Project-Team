import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCrown } from "react-icons/fa";
import { VscTriangleDown } from "react-icons/vsc";
import "components/NavBar/NavBar.css";

function NavBar({
  lightTheme,
  userLogin,
  isUserAdmin,
}) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropDownMenu, setdropDownMenu] = useState(false);

  return (
    <nav className={lightTheme ? "lightNav" : "darkNav"}>
      <div className="leftSideNav">
        <div className="logo">
          <Link to="/">
            <img
              src={lightTheme ? "./assets/logo_black.gif" : "./assets/logo_white.gif"}
              alt="logo"
            />
          </Link>
        </div>
        <div className="mainLinks">
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          {userLogin && (
            <Link to="/notice">Notice</Link>
          )}
        </div>
      </div>
      <div className="userLinks">
        {userLogin ? (
          <div>
            Hello,&nbsp;
            {isUserAdmin && (
              <FaCrown className="crown" />
            )}
            &nbsp;Elly&nbsp;
            <VscTriangleDown
              className="triangleDown"
              onClick={() => setdropDownMenu((prev) => !prev)}
            />
            {dropDownMenu && (
              <div
                className="dropDownMenu"
                onClick={() => setdropDownMenu((prev) => !prev)}
              >
                <div className={lightTheme ? "lightDrop" : "darkDrop"}>
                  <Link to="/myaccount">My Account</Link>
                  <Link to="/admin">Admin</Link>
                  <Link to="/logout">Logout</Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
          <Link to="/signin">Sign In</Link>
          <Link to="/joinus">Join Us</Link>
          </>
        )}
      </div>
      <div className="smallNav">
        <GiHamburgerMenu
          className="navHamburger"
          onClick={() => setToggleMenu((prev) => !prev)}
        />
        {toggleMenu && (
          <div
            className="smallNavToggle"
            onClick={() => setToggleMenu((prev) => !prev)}
          >
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            {userLogin ? (
              <>
              <Link to="/notice">Notice</Link>
              <Link to="/myaccount">My Account</Link>
              {isUserAdmin && (
                <Link to="/admin">Admin</Link>
              )}
              <Link to="/logout">Logout</Link>
              </>
            ) : (
              <>
              <Link to="/signin">Sign In</Link>
              <Link to="/joinus">Join Us</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
