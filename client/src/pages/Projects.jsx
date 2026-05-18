import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/projects"
      );

      setProjects(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const createProject = async () => {
    try {

      await axios.post(
        "http://localhost:5000/api/projects/create",
        {
          name,
          description,
          owner: "68162c9db5cb51b84cb5a45a"
        }
      );

      setName("");
      setDescription("");

      fetchProjects();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      <h1>Projects</h1>

      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={createProject}>
        Create Project
      </button>

      <hr />

      <h2>Project List</h2>

      {projects.map((project) => (
        <div key={project._id}>

          <h3>{project.name}</h3>

          <p>{project.description}</p>

          <a href="/tasks">
            <button>View Tasks</button>
          </a>

          <hr />

        </div>
      ))}

    </div>
  );
}

export default Projects;