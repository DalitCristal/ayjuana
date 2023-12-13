import { getCookiesByName } from "../../utils/formsUtils";

export const fetchUserData = async (userId) => {
  try {
    const token = getCookiesByName("jwtCookie");

    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.mensaje; // Datos del usuario
    } else {
      const errorData = await response.json();
      throw new Error(errorData.mensaje);
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    throw error;
  }
};
