<script>
  import { onMount } from "svelte";
  import Swal from "sweetalert2";
  import { fetchWithAuth } from '../api/auth';

  export let id; // ID del producto al que se le hará la entrada.

  let errorMessage = '';

  // Datos del producto (se cargan cuando se hace la petición GET)
  let sku = "";
  let nombre = "";
  let descripcion = "";
  let url_imagen = "";
  let unidad_producto = "";
  let cantidad = 1;
  let stock = 0;

  // Datos para la entrada
  let entrada_cantidad = 1;
  let observacion = "";

  onMount(async () => {
    try {
      // Obtener detalles del producto por su ID
      if (id) {
        const product = await fetchWithAuth(`https://vitribackendflask.onrender.com/api/admin/productos/${id}`);      
        if (product) {
          // Asignar datos del producto para mostrar
          sku = product.sku || "";
          nombre = product.nombre || "";
          descripcion = product.descripcion || "";
          url_imagen = product.url_imagen || "";
          unidad_producto = product.unidad_producto || "";
          cantidad = product.cantidad || 0;
          stock = product.stock || 0;
        }
      }
    } catch (error) {
      console.error("Error:", error.message);  // Asegúrate de imprimir el mensaje de error
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      entrada_productos: id,         // ID del producto
      entrada_cantidad: entrada_cantidad, // Cantidad de la entrada
      observacion: observacion,         // Observación de la entrada
      entrada_usuario: 1               // Reemplaza con el ID del usuario actual
    };

    try {
    // Llama a fetchWithAuth y obtiene los datos como JSON si están disponibles
    const data = await fetchWithAuth("https://vitribackendflask.onrender.com/api/admin/entradas", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    // Si `data` es null, significa que la respuesta estaba vacía
    if (data) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Entrada creada correctamente",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "/productos";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Respuesta inesperada del servidor",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al conectar con el servidor",
    });
    console.error("Error:", error);
  }
  };
</script>

<main class="row m-0">
<div class="col-12 col-md-8 mx-auto pt-3 mb-4 mb-md-0">
  <h3>Nueva entrada para el producto</h3>

  <form on:submit={handleSubmit}>
    <div class="card p-3">
      <!-- Información del Producto -->
      <h3 class="text-center">{nombre} x{cantidad} {unidad_producto}</h3>
      <p class="text-center">Stock actual: {stock}</p>
      
      <div class="row mx-auto pt-3">
        <!-- Cantidad de la Entrada -->
        <div class="col-12 my-auto col-md-4">
            <div class="input-group input-group-static my-2">
                <label for="entrada_cantidad">Cantidad de entrada</label>
                <input type="number" class="form-control" bind:value={entrada_cantidad} min="1" required />
            </div>
        </div>

        <!-- Observación de la Entrada -->
        <div class="col-12 col-md-8">
            <div class="input-group input-group-static my-2">
              <label for="observacion">Observación (opcional)</label>
              <textarea class="form-control" bind:value={observacion}></textarea>
            </div>
          </div>

        <!-- Botones de acción -->
        <div class="col-12 text-center mt-4">
          <a href="/productos" class="btn btn-danger">Cancelar</a>
          <button type="submit" class="btn btn-success">Agregar entrada</button>
        </div>
      </div>
    </div>
  </form>
</div>
</main>
