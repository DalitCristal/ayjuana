export async function validateData(data) {
  if (
    !data.title ||
    !data.description ||
    !data.price ||
    !data.stock ||
    !data.category ||
    !data.code
  ) {
    return "Todos los campos marcados con * son obligatorios.";
  }

  if (typeof data.title !== "string" || !isNaN(Number(data.title))) {
    return "Título debe ser una cadena de texto.";
  }

  if (isNaN(data.price) || isNaN(data.stock)) {
    return "Precio y stock deben ser números.";
  }

  // Validación de límite para precio y stock
  if (data.price < 0 || data.price > 1000000) {
    return "El precio debe estar entre 0 y 1000000.";
  }

  if (data.price < 0) {
    return "El precio debe ser un número positivo.";
  }

  if (data.stock < 0 || data.stock > 10000) {
    return "El stock debe estar entre 0 y 10000.";
  }

  // Validación de longitud para título y descripción
  if (data.title.length < 1 || data.title.length > 100) {
    return "El título debe tener entre 1 y 100 caracteres.";
  }

  if (data.description.length < 10 || data.description.length > 500) {
    return "La descripción debe tener entre 10 y 500 caracteres.";
  }

  // Validación de formato y longitud para código
  const codeRegex = /^[A-Za-z0-9Ññ]+$/;
  if (!codeRegex.test(data.code) || data.code.length !== 8) {
    return "El código debe contener solo letras y números, y debe tener exactamente 8 caracteres.";
  }

  // Validación de Imágenes
  if (!data.thumbnails) {
    data.thumbnails = [
      "https://firebasestorage.googleapis.com/v0/b/my-ecommerce-947aa.appspot.com/o/producto-sin-foto.jpg?alt=media&token=6b5f7454-d7c3-464b-8ddf-cab6cfaa83df",
    ];
  } else if (typeof data.thumbnails === "string") {
    data.thumbnails = data.thumbnails.split(",").map((url) => url.trim());
  } else if (Array.isArray(data.thumbnails)) {
    data.thumbnails = data.thumbnails.map((url) => url.trim());
  } else {
    return "El campo de imágenes no tiene el formato esperado.";
  }

  // Validación de estado del producto
  if (data.status !== "true" && data.status !== "false") {
    return "El estado del producto debe ser verdadero o falso.";
  }

  // Si no hay errores
  return null;
}
