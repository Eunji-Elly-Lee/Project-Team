import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BsCheck2Circle } from "react-icons/bs";
import "components/Reset/Reset.css";

function Reset() {
  const initialUserState = {
    _id: "",
    username : "",
    email: "",
    password: "",
    role: false
  };
  const [user, setUser] = useState(initialUserState);
  const [redirecting, setRedirecting] = useState(false);
  const [resetForm, setResetForm] = useState(true);
  const [message, setMessage] = useState("");
  const [newPW, setNewPW] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Submit new password and update user's password
  const onResetPW = async (e) => {
    e.preventDefault();
    
    // Confirm entered password
    if (newPW === confirmPW) {
      try {
        // Update user info
        const updatedUser = {
          _id: user._id,
          username: user.username,
          email: user.email,
          password: newPW,
          role: user.role
        };

        await axios.put(`${process.env.REACT_APP_API_URL}/users/update`, {
          user: updatedUser
        });

        setResetForm(false);
        setMessage("Reset successfully! Please sign in with a new password.");
      } catch (error) {
        console.log(error);
      }
    } else {
      setMessage("Please enter the same for password confirmation!");
      setConfirmPW("");
    }
  };

  useEffect(() => {
    // Get parameter value from location state
    if (location.state && location.state.user) {
      setUser(location.state.user);
      setRedirecting(true);
      // Redirect to current path without location state
      navigate(".", {
        replace: true
      });
    }

    // If not the route through the join us page
    if (location.state === null && !redirecting) {
      navigate("/");
    }
  }, [location.state, navigate, redirecting]);

  return (
    <div className="resetContainer">
      <div className="resetMessage">
        Hi <span>{user.username}</span>!     
        <div className="resetErrorMessage">{message}</div>   
      </div>
      {resetForm ? (
        <>
        <div>
          Please enter your new password.
        </div>
        <Form onSubmit={onResetPW} className="resetForm">
          <Form.Group as={Row} className="resetInput">
              <Form.Label column sm="4" className="resetLabel">
                Password
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="password"
                  required
                  name="password"
                  value={newPW}
                  onChange={(e) => setNewPW(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="resetInput">
              <Form.Label column sm="4" className="resetLabel">
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
            className="resetBtn"
            variant="outline-info"
            type="submit"
          >
            Submit
          </Button>
        </Form>
        </>
      ) : (
        // After completing reset password
        <>
        <div className="resetCheck">
          <BsCheck2Circle />
        </div>
        <div className="goToSignin">
          Go to 
          <Link to="/signin">Sign in</Link>
        </div>
        </>
      )}      
    </div>
  );
}

export default Reset;
