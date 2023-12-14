const getProductsAdmin = async (page) => {
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
