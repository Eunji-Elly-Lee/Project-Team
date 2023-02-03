import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import "components/JoinUs/JoinUs.css";

function JoinUs() {
  const initialUserState = {
    username : "",
    email: "",
    password: ""
  };
  const [user, setUser] = useState(initialUserState);
  const [message, setMessage] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const navigate = useNavigate();

  const onJoinForm = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Submit the form to join
  const onJoin = async (e) => {
    e.preventDefault();

    // Confirm entered password
    if (user.password === confirmPW) {
      try {
        // Check if the email is aready registered or not
        const userCheck = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/user?email=${user.email}`
        )
        .then((response) => {
          return response.data;
        });
  
        if (userCheck) {
          setMessage("The email is already registered");
        } else {
          // Send email for verification and get the code from server
          const code = await axios.post(`${process.env.REACT_APP_API_URL}/emails/codeEmail`, {
            email: user.email
          })
          .then((response) => {
            return response.data;
          });

          setMessage("");
          // Go to the verification page
          navigate("/joinus/verification", {
            state: {
              user: user,
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
              value={user.username}
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
              value={user.email}
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
              value={user.password}
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
          Join
        </Button>
      </Form>
    </div>
  );
}

export default JoinUs;
