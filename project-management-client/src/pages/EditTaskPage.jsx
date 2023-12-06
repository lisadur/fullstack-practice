import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

export default function EditTaskPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/tasks/${taskId}`)
      .then((response) => {
        const oneTask = response.data;
        setTitle(oneTask.title);
        setDescription(oneTask.description);
      })
      .catch((err) => console.log(err));
  }, [taskId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description };

    axios
      .put(`${API_URL}/api/tasks/${taskId}`, requestBody)
      .then((response) => {
        navigate(-1);
      });
  };

  const deleteTask = () => {
    axios
      .delete(`${API_URL}/api/tasks/${taskId}`)
      .then(() => {
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditTaskPage">
      <h3>Edit the Task</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Task</button>
      </form>
      <button onClick={deleteTask}>Delete Task</button>
    </div>
  );
}
