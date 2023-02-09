import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../redux/themeSlice";
import "components/SignIn/SignIn.css";

function SignIn() {
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
      Sign In!!
    </div>
  );
}

export default SignIn;
