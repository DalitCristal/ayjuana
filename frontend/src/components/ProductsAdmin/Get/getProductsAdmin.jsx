const getProducts = async ({
  page = 1,
  pageSize = 12,
  category,
  status,
  sort,
}) => {
  try {
    let apiUrl = `http://localhost:8080/api/products?page=${page}&pageSize=${pageSize}`;

    // Agregar filtros
    if (category) {
      apiUrl += `&category=${category}`;
    }

    if (status) {
      apiUrl += `&status=${status}`;
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
      console.error("Error al recuperar productos:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error al recuperar productos:", error);
    return [];
  }
};

export default getProducts;

/* const getProductsAdmin = async (page) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/products?page=${page}` 
    );
    const data = await response.json();
    const productsArray = data.mensaje;

    return productsArray;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default getProductsAdmin;
 */
