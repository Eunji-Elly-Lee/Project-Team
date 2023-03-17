import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { debounce } from "lodash";
import { themeActions } from "../../redux/themeSlice";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import AddProjectModal from "components/ProjectModal/AddProjectModal";
import "components/Projects/Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Get all projects from server
  const getProjects = async () => {
    try {
      const allProjects = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/getAll`
      )
      .then((response) => {
        return response.data;
      });

      // The latest project comes out first
      setProjects(allProjects.slice(0).reverse());
    } catch (error) {
      console.log(error);
    }
  };

  // Set the width value when the screen is resized
  const onResize = debounce(() => {
    setWindowWidth(window.innerWidth);
  }, [1000]);

  useEffect(() => {
    dispatch(themeActions.lightTheme());
    getProjects();

    // Set state based on user's value
    if (user !== null) {
      setLogin(true);

      if (user.role) {
        setAdmin(true);
      }
    } else {
      setLogin(false);
      setAdmin(false);
    }
  }, [dispatch, user]);

  // Control resize event
  useEffect(() => {    
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, [onResize]);

  return (
    <div
      className={"projectsContainer" +
        (projects.length > 2 ? " manyProjects" : "")
      }
    >
      <div className="projectsTitle">Projects</div>      
      <Container>
        {/* Only admin can add a new project */}
        {admin && (
          <div className="prjAddBtnWrap">
            <Button
              className="prjAddBtn"
              variant="outline-info"
              onClick={() => setModalShow(true)}
            >
              Add
            </Button>
          </div>
        )}
        {/* If no projects are registered */}
        {projects.length < 1 ? (
          <div className="noProjects">
            No projects are registered!
          </div>
        ) : (
          <Row>
            {projects.map((project) => {
              return(
                <ProjectCard
                  key={project._id}
                  project={project}
                  login={login}
                  admin={admin}
                />
              );
            })}
            {/* Control blank when the number of projects is small */}
            {((projects.length === 1 && windowWidth >= 992) ||
              (projects.length === 2 && windowWidth >= 1400)) && (
              <>
              <Col lg="6" xxl="4">
                <Card className="waitPrj">
                  Wait Next Project
                </Card>
              </Col>
              {(projects.length === 1 && windowWidth >= 1400) && (
                <Col lg="6" xxl="4">
                  <Card className="waitPrj">
                    Wait Next Project
                  </Card>
                </Col>
              )}
              </>
            )}
          </Row>
        )}        
      </Container>
      {/* When clicking Add button, open the project modal */}
      <AddProjectModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default Projects;
