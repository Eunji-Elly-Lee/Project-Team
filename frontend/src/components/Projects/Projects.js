import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { themeActions } from "../../redux/themeSlice";
import "components/Projects/Projects.css";

function Projects() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(themeActions.lightTheme());
  }, [dispatch]);

  return (
    <div>
      Projects!!
    </div>
  );
}

export default Projects;
