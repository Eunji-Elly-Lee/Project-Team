import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../redux/themeSlice";
import "components/Forgot/Forgot.css";

function Forgot() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // If user logins, go to the main page
    if (user) {
      navigate("/");
    } else {
      dispatch(themeActions.darkTheme());
    }
  }, [user, navigate, dispatch]);

  return (
    <div>
      Forgot!!
    </div>
  );
}

export default Forgot;
