import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../redux/themeSlice";
import { Col, Container, Row } from "react-bootstrap";
import Calendar from "components/Calendar/Calendar";
import Chat from "components/Chat/Chat";
import "components/Working/Working.css";

function Working() {
  const [projectId, setProjectId] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Get parameter value from location state and set dark theme if user logins
    if (location.state && location.state.project && user !== null) {
      setProjectId(location.state.project._id);
      setProjectTitle(location.state.project.title);
      dispatch(themeActions.darkTheme());
    } else {
      navigate("/");
    }
  }, [location.state, dispatch, user, navigate]);

  return (
    <div className="workingContainer">
      <div className="workingTitle">{projectTitle}</div>
      <Container>
        <Row>
          <Col lg="7">
            <Calendar projectId={projectId} user={user} />
          </Col>
          <Col lg="5">
            <Chat projectId={projectId} user={user} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Working;
