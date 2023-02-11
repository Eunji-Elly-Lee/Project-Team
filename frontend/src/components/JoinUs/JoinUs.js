import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../redux/themeSlice";
import { Button, Col, Form, Row } from "react-bootstrap";
import "components/JoinUs/JoinUs.css";

function JoinUs() {
  const initialUserState = {
    username : "",
    email: "",
    password: ""
  };
  const [newUser, setNewUser] = useState(initialUserState);
  const [message, setMessage] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onJoinForm = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Submit the form to join
  const onJoin = async (e) => {
    e.preventDefault();

    // Confirm entered password
    if (newUser.password === confirmPW) {
      try {
        // Check if the email is aready registered or not
        const userCheck = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/user?email=${newUser.email}`
        )
        .then((response) => {
          return response.data;
        });
  
        if (userCheck) {
          setMessage("The email is already registered!");
        } else {
          // Send email for verification and get the code from server
          const code = await axios.post(`${process.env.REACT_APP_API_URL}/emails/codeEmail`, {
            email: newUser.email
          })
          .then((response) => {
            return response.data;
          });

          // Go to the verification page
          navigate("/joinus/verification", {
            state: {
              user: newUser,
              code: code
            }
          });
        }
      } catch (error) {
        console.log(error);
      }        
    } else {
      setMessage("Please enter the same for password confirmation!");
      setConfirmPW("");
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
    <div className="joinContainer">
      <div className="joinMessage">{message}</div>
      <div className="signInLink">
        Have an account? 
        <Link to="/signin">Sign in</Link>
      </div>
      <Form onSubmit={onJoin}>
        <Form.Group as={Row} className="joinInput">
          <Form.Label column sm="4" className="joinLabel">
            User Name
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              required
              name="username"
              value={newUser.username}
              onChange={onJoinForm}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="joinInput">
          <Form.Label column sm="4" className="joinLabel">
            Email
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="email"
              required
              name="email"
              value={newUser.email}
              onChange={onJoinForm}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="joinInput">
          <Form.Label column sm="4" className="joinLabel">
            Password
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="password"
              required
              name="password"
              value={newUser.password}
              onChange={onJoinForm}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="joinInput">
          <Form.Label column sm="4" className="joinLabel">
            Confirm PW
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="password"
              required
              name="password"
              value={confirmPW}
              onChange={(e) => setConfirmPW(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button
          className="joinBtn"
          variant="outline-info"
          type="submit"
        >
          Join in
        </Button>
      </Form>
    </div>
  );
}

export default JoinUs;
