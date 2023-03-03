import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "components/Projects/ProjectCard.css";

function ProjectCard({ project, login, admin }) {
  return (
    <Col lg="6" xxl="4">
      <Card className="projectCard">
        {/* Only admin can edit the project */}
        {admin && (
          <div className="prjEditBtnWrap">
            <Button
              className="prjEditBtn"
              variant="outline-info"
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
    </Col>
  );
}

export default ProjectCard;
