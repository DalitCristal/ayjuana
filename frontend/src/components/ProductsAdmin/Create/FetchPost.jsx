import { HOST } from "../../../config/config";

const postProduct = async ({ token, data }) => {
  try {
    let apiUrl = `${HOST}/api/products`;

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
      if (response.status >= 500) {
        console.error(`Error del servidor: ${response.status}, ${response} `);
      }
    }

    try {
      const responseData = await response.json();
      const product = responseData.mensaje;
      return product;
    } catch (error) {
      console.error(`${error}, código ya existente.`);
    }
  } catch (error) {
    console.error(`Error en la solicitud al servidor: ${error} `);
  }
};

export default postProduct;
