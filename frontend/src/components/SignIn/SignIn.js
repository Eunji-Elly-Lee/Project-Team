import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/userSlice";
import { themeActions } from "../../redux/themeSlice";
import { Button, Col, Form, Row } from "react-bootstrap";
import "components/SignIn/SignIn.css";

function SignIn() {
  const initialUserState = {
    email: "",
    password: ""
  };
  const [signUser, setSignUser] = useState(initialUserState);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSignForm = (e) => {
    const { name, value } = e.target;
    setSignUser({ ...signUser, [name]: value });
  };

  // Submit the form to sign in
  const onSign = async (e) => {
    e.preventDefault();

    try {
      const loginUser = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
        user: signUser
      })
      .then((response) => {
        return response.data;
      });

      if (typeof loginUser === 'object') {
        // Login successfully
        dispatch(userActions.login(loginUser));        
        navigate("/");
      } else {
        // If the email is not registered or entered password is invalid
        const resetPWUser = {
          email: signUser.email,
          password: ""
        }
        setSignUser(resetPWUser);
        setMessage(loginUser + " - Please check again!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // If user logins, go to the main page
    if (user) {
      navigate("/");
    } else {
      dispatch(themeActions.darkTheme());
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="signContainer">
      <div className="signMessage">{message}</div>
      <div className="joinUsLink">
        Don't have an account yet? 
        <Link to="/joinus">Join Us</Link>
      </div>
      <Form onSubmit={onSign}>
        <Form.Group as={Row} className="signInput">
          <Form.Label column sm="4" className="signLabel">
            Email
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="email"
              required
              name="email"
              value={signUser.email}
              onChange={onSignForm}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="signInput">
          <Form.Label column sm="4" className="signLabel">
            Password
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="password"
              required
              name="password"
              value={signUser.password}
              onChange={onSignForm}
            />
          </Col>
        </Form.Group>
        <Button
          className="signBtn"
          variant="outline-info"
          type="submit"
        >
          Sign in
        </Button>
      </Form>
      <Link to="/forgot" className="forgotLink">
        Forgot password?
      </Link>
    </div>
  );
}

export default SignIn;
