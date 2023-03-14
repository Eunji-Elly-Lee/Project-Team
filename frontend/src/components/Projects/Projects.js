import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { themeActions } from "../../redux/themeSlice";
import { Button, Container, Row } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import AddProjectModal from "components/ProjectModal/AddProjectModal";
import "components/Projects/Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [modalShow, setModalShow] = useState(false);
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
