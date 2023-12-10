const getProducts = async (page = 1, pageSize = 10) => {
  try {
    const apiUrl = `http://localhost:8080/api/products?page=${page}&pageSize=${pageSize}`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const responseData = await response.json();
      const productsArray = responseData.mensaje;

      return productsArray;
    } else {
      console.error("Error fetching products:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default getProducts;
