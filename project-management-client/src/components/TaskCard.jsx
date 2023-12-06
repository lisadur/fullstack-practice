import { Link } from "react-router-dom";

export default function TaskCard({ title, description, _id }) {
  return (
    <div className="TaskCard card">
      <h3>{title}</h3>
      <h4>Description:</h4>
      <p>{description}</p>
      <Link to={`/tasks/${_id}`}>
        <button>Make changes</button>
      </Link>
    </div>
  );
}
