const postProduct = async ({ token, data }) => {
  try {
    let apiUrl = "http://localhost:8080/api/products";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      let errorMessage = "Hubo un error al procesar la solicitud.";

      // Si es un error del servidor
      if (response.status >= 500) {
        console.error(`Error del servidor: ${response.status}`, response);
      }

      return errorMessage;
    }

    try {
      const responseData = await response.json();
      const product = responseData.mensaje;
      return product;
    } catch (error) {
      console.error("Error al parsear la respuesta JSON", error, response);

      const errorMessage = `${response.respuesta}, código ya existente`;

      return errorMessage;
    }
  } catch (error) {
    console.error("Error en la solicitud HTTP", error);
    return "Error al realizar la solicitud al servidor.";
  }
};

export default postProduct;

/* const postProduct = async ({ token, data }) => {
  try {
    let apiUrl = "http://localhost:8080/api/products";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorMessage = "Hubo un error al procesar la solicitud.";
      return errorMessage;
    }

    if (response.status === 200) {
      const responseData = await response.json();
      const product = responseData.mensaje;

      return product;
    } else {
      const responseData = await response.json();

      const errorMessage = `${responseData.respuesta}, código ya existente`;

      return errorMessage;
    }
  } catch (error) {
    const responseData = `Error al crear producto ${error} `;

    return responseData;
  }
};

export default postProduct;
 */
