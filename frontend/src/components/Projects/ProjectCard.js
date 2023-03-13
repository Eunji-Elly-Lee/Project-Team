import { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditProjectModal from "components/ProjectModal/EditProjectModal";
import "components/Projects/ProjectCard.css";

function ProjectCard({ project, login, admin }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Col lg="6" xxl="4">
      <Card className="projectCard">
        {/* Only admin can edit the project */}
        {admin && (
          <div className="prjEditBtnWrap">
            <Button
              className="prjEditBtn"
              variant="outline-info"
              onClick={() => setModalShow(true)}
            >
              Edit
            </Button>
          </div>
        )}
        <div>
          <Card.Body>
            <Card.Title className="projectTitle">
              {project.title}
            </Card.Title>
            <Card.Text>
              {project.contents} <br />
              Used: {project.skills}
            </Card.Text>
            {project.github && (
              <Card.Link href={project.github} target="_blank">
                Github
              </Card.Link>
            )}
            {project.link && (
              <Card.Link href={project.link} target="_blank">
                Link
              </Card.Link>
            )}
            {/* When user logins, show the working link */}
            {login && (
              <div className="workingLink">
                Go to 
                <Link to="/working"> Working</Link>
              </div>
            )}
          </Card.Body>
        </div>
      </Card>
      {/* When clicking Edit button, open the project modal */}
      <EditProjectModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        project={project}
      />
    </Col>
  );
}

export default ProjectCard;
