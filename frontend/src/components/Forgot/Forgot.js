import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { themeActions } from "../../redux/themeSlice";
import { Button, Col, Form, Row } from "react-bootstrap";
import "components/Forgot/Forgot.css";

function Forgot() {
  const EMAIL_MSG = "Please enter your email for sending verification code.";
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(EMAIL_MSG);
  const [resetUser, setResetUser] = useState(null);
  const [emailForm, setEmailForm] = useState(true);
  const [resending, setResending] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Send email for verification code
  const onSendEmail = async (e) => {
    e.preventDefault();

    try {
      // Check if the email is registered or not
      const userCheck = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/get?email=${email}`
      )
      .then((response) => {
        return response.data;
      });

      if (userCheck) {
        // Send email for verification and get the code from server
        const gettingCode = await axios.post(`${process.env.REACT_APP_API_URL}/emails/codeEmail`, {
          email: email
        })
        .then((response) => {
          return response.data;
        });

        setEmail("");
        setCode(gettingCode);
        setMessage("The code has been sent to your email!");
        setResetUser(userCheck);
        setEmailForm(false);
      } else {
        setMessage("This email is not registered!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Submit code to verify the email
  const onVerify = async (e) => {
    e.preventDefault();

    if (code.toString() === confirmCode) {
      // Go to the reset password page
      navigate("/reset", {
        state: {
          user: resetUser
        }
      });
    } else {
      setMessage("Invalid code - Please check again!");
      setResending(true);
      setConfirmCode("");
    }
  };

  // Show the email form for resending code
  const onResendEmail = () => {    
    setMessage(EMAIL_MSG);
    setResetUser(null);
    setEmailForm(true);
    setResending(false);
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
    <div className="forgotContainer">
      <div className="forgotMessage">{message}</div>
      {emailForm ? (
        // Sending email form
        <Form onSubmit={onSendEmail}>
          <Form.Group as={Row} className="forgotInput">
            <Form.Label column sm="2" className="forgotLabel">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button
            className="forgotBtn"
            variant="outline-info"
            type="submit"
          >
            Send code
          </Button>
        </Form>
      ) : (
        <>
        {/* Verifying code form */}
        <Form onSubmit={onVerify}>
          <Form.Group as={Row} className="forgotInput">
            <Form.Label column sm="2" className="forgotLabel">
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
            className="forgotBtn"
            variant="outline-info"
            type="submit"
          >
            Verify
          </Button>
        </Form>
        {/* Click section for resending email */}
        {resending && (
          <div className="resendingClick">
            <span onClick={onResendEmail}>Resend code</span>
          </div>
        )}
        </>
      )}
    </div>
  );
}

export default Forgot;
