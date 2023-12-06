import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

import AddProject from "../components/AddProject";

const API_URL = "http://localhost:5005";

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    axios
      .get(`${API_URL}/api/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="ProjectListPage">
      <AddProject refreshProjects={getAllProjects} />
      {projects.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  );
}
