import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./UserCard.css";

const UserCard = ({ user }) => {
  const { _id, first_name, last_name, email, rol } = user;

  return (
    <div className="user-card">
      <p>Nombre: {first_name}</p>
      <p>Apellido: {last_name}</p>
      <p>Email: {email}</p>
      <p>Rol: {rol}</p>
      <Link to={`/users/edit/${_id}`}>Editar Usuario</Link>
      <Link to={`/users/delete/${_id}`}>Eliminar Usuario</Link>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
