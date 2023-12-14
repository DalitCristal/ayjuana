import { getCookiesByName } from "./formsUtils";

// Función para obtener los detalles del usuario por ID
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
      //console.log("Datos del usuario", data);
      return { data: data.mensaje }; // Datos del usuario
    } else {
      const errorData = await response.json();
      return { error: errorData.mensaje };
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return { error: error.message };
  }
};

// Función para actualizar los detalles del usuario por ID
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

    if (response.ok) {
      const data = await response.json();
      return data; // Puede que quieras retornar algo específico de la respuesta
    } else {
      const errorData = await response.json();
      throw new Error(errorData.mensaje);
    }
  } catch (error) {
    console.error("Error updating user data:", error.message);
    throw error;
  }
};
