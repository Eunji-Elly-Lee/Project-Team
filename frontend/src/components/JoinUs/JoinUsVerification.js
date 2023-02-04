import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userActions } from "../../redux/userSlice";
import { Button, Col, Form, Row } from "react-bootstrap";
import "components/JoinUs/JoinUsVerification.css";

function JoinUsVerification() {
  const initialUserState = {
    username : "",
    email: "",
    password: ""
  };
  const [user, setUser] = useState(initialUserState);
  const [code, setCode] = useState("");
  const [resending, setResending] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Submit code to join
  const onCompleteJoin = async (e) => {
    e.preventDefault();

    if (code.toString() === confirmCode) {
      try {
        // Register user
        const newUser = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
          user
        })
        .then((response) => {
          return response.data;
        });

        // Login new user
        dispatch(userActions.login(newUser));        
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      setMessage("Invalid code - Please check again!");
      setResending(true);
    }
  };

  // Resend email for new code
  const onResendEmail = async () => {
    try {
      const newCode = await axios.post(`${process.env.REACT_APP_API_URL}/emails/codeEmail`, {
        email: user.email
      })
      .then((response) => {
        return response.data;
      });

      setCode(newCode);
      setMessage("");
      setConfirmCode("");
      setResending(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Get parameter value from location state
    if (location.state && location.state.user && location.state.code) {
      setUser(location.state.user);
      setCode(location.state.code);
      setRedirecting(true);
      // Redirect to current path without state
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
    <div className="joinCodeContainer">
      <div className="joinCodeMessage">
        <div className="codeErrorMessage">{message}</div>
        Welcome <span>{user.username}</span>!        
      </div>
      <div>
        The verification code has been sent to your email. <br />
        Please enter the code here to complete your membership.
      </div>
      <Form onSubmit={onCompleteJoin}>
        <Form.Group as={Row} className="joinCodeInput">
          <Form.Label column sm="2" className="joinCodeLabel">
            Code
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              required
              value={confirmCode}
              onChange={(e) => setConfirmCode(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button
          className="joinCodeBtn"
          variant="outline-info"
          type="submit"
        >
          Complete
        </Button>
      </Form>
      {/* Link for resending email */}
      {resending && (
        <div className="resendingLink">
          <span onClick={onResendEmail}>Resend code</span>
        </div>
      )}
    </div>
  );
}

export default JoinUsVerification;
