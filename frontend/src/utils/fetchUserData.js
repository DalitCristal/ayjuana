import { getCookiesByName } from "./formsUtils";

// Función para obtener los detalles del usuario por Id
//TITULAR Y ROL
export const fetchUserData = async (id) => {
  try {
    const token = getCookiesByName("jwtCookie");

    const response = await fetch(`http://localhost:8080/api/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 200) {
      const data = await response.json();

      return { data: data.mensaje };
    } else {
      const errorData = await response.json();
      console.error("Error al obtener datos del usuario:", errorData.mensaje);

      return { error: errorData.mensaje };
    }
  } catch (error) {
    console.error("Error en la solicitud de datos del usuario:", error.message);
    return { error: error.message };
  }
};

// Actualizar el rol del usuario
export const updateUser = async (id, updatedUserData) => {
  try {
    const token = getCookiesByName("jwtCookie");

    const response = await fetch(
      `http://localhost:8080/api/users/premium/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
        credentials: "include",
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error(errorData.mensaje);
    }
  } catch (error) {
    console.error("Error al actualizar los datos del usuario:", error.message);
  }
};
