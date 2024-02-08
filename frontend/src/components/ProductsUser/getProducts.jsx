import { getUserRole } from "../ProtectedRoute/rolDelUsuario";
import { HOST } from "../../config/config";

const getProducts = async ({ page = 1, pageSize = 12, category, sort }) => {
  try {
    let apiUrl = `${HOST}/api/products?page=${page}&pageSize=${pageSize}`;
    const userRole = getUserRole();

    // Agregar filtros
    if (category) {
      apiUrl += `&category=${category}`;
    }

    // Usuario, siempre agregar el filtro de status true
    if (userRole === "user") {
      apiUrl += `&status=true`;
    }

    if (sort) {
      apiUrl += `&sort=${sort}`;
    }

    const response = await fetch(apiUrl);

    if (response.status === 200) {
      const responseData = await response.json();
      const productsArray = responseData.mensaje;

      return productsArray;
    } else {
      console.error(`Error en la solitud, ${response.status} `);

      return [];
    }
  } catch (error) {
    console.error(`Error ${error} `);

    return [];
  }
};

export default getProducts;
