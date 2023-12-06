import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";

const API_URL = "http://localhost:5005";

export default function TaskDetailsPage(props) {
  const [task, setTask] = useState(null);

  const { taskId } = useParams();

  const getTask = () => {
    axios
      .get(`${API_URL}/api/tasks/${taskId}`)
      .then((response) => {
        const oneTask = response.data;
        setTask(oneTask);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="TaskDetails">
      {task && (
        <>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
        </>
      )}
    </div>
  );
}
