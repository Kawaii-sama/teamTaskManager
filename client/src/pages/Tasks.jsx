import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {

  const role = localStorage.getItem("role");

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async () => {
    try {

      await axios.post(
        "http://localhost:5000/api/tasks/create",
        {
          title,
          description
        }
      );

      setTitle("");
      setDescription("");

      fetchTasks();

    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id) => {
    try {

      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          status: "Completed"
        }
      );

      fetchTasks();

    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {

      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`
      );

      fetchTasks();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      <h1>Tasks</h1>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={createTask}>
        Create Task
      </button>

      <hr />

      <h2>Task List</h2>

      {tasks.map((task) => (
        <div key={task._id}>

          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>Status: {task.status}</p>

          <button onClick={() => updateStatus(task._id)}>
            Mark Completed
          </button>

          {role === "admin" && (
            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          )}

          <hr />

        </div>
      ))}

    </div>
  );
}

export default Tasks;