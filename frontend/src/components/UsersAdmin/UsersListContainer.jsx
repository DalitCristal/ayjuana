import { useState, useEffect } from "react";
import { getCookiesByName } from "../../utils/formsUtils";
import Header from "../Header/Header";
import UsersList from "./UsersList";

const UsersListContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getCookiesByName("jwtCookie");

        const response = await fetch("http://localhost:8080/api/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          setUsers(data.mensaje);
        } else {
          console.error("Error al obtener usuarios:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <div>
        <h1>Lista de Usuarios</h1>
        {loading ? <p>Cargando...</p> : <UsersList users={users} />}
      </div>
    </>
  );
};

export default UsersListContainer;
