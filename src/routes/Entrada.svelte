<script>
    import { onMount } from "svelte";
    import Swal from "sweetalert2";
    import { fetchWithAuth } from '../api/auth';
    import { getCategorias } from '../api/categorias';
  
    export let id; // Si existe, es edición. Si no, es creación.
  
    let categorias = [];
    let errorMessage = '';
  
    // DATOS
    let sku = "";
    let nombre = "";
    let descripcion = "";
    let url_imagen = "";
    let url_ficha_tecnica = null;
    let unidad_producto = "";
    let cantidad = 1;
    let precio = 0;
    let is_promocion = false;
    let descuento = 0;
    let stock = 0;
    let is_activo = true;
    let id_categorias = 0;
    let fecha_inicio_descuento = null;
    let fecha_fin_descuento = null;
  
    onMount(async () => {
      try {
        categorias = await getCategorias();
  
        // Si hay un id, obtener detalles del producto (ya como JSON)
        if (id) {
          const product = await fetchWithAuth(`http://127.0.0.1:5000/api/admin/productos/${id}`);      
          if (product) {
  
            sku = product.sku || "";
            nombre = product.nombre || "";
            descripcion = product.descripcion || "";
            url_imagen = product.url_imagen || "";
            url_ficha_tecnica = product.url_ficha_tecnica || null;
            unidad_producto = product.unidad_producto || "";
            cantidad = product.cantidad || 0;
            precio = product.precio || 0;
            is_promocion = product.is_promocion || false;
            descuento = product.descuento || 0;
            stock = product.stock || 0;
            is_activo = product.is_activo || true;
            id_categorias = product.id_categorias || 0;
            fecha_inicio_descuento = convertirFechaDatetimeAFecha(product.fecha_inicio_descuento) || null;
            fecha_fin_descuento = convertirFechaDatetimeAFecha(product.fecha_fin_descuento) || null;
            console.log(product)
          }
        }
      } catch (error) {
        console.error(errorMessage, error.message);  // Asegúrate de imprimir el mensaje de error
      }
    });
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = {
        sku,
        nombre,
        descripcion,
        url_imagen,
        url_ficha_tecnica,
        unidad_producto,
        cantidad,
        precio,
        is_promocion,
        descuento,
        stock,
        is_activo,
        id_categorias,
        fecha_inicio_descuento,
        fecha_fin_descuento,
      };
  
      try {
        const method = id ? "PATCH" : "POST";
        const url = id
          ? `http://127.0.0.1:5000/api/admin/productos/${id}`
          : `http://127.0.0.1:5000/api/admin/productos`;
  
        // Usar fetchWithAuth en lugar de fetch
        const response = await fetchWithAuth(url, {
          method,
          body: JSON.stringify(formData),
        });
  
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Producto guardado correctamente",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "/productos";// Redirigir a la lista de productos
        });
  
      } catch (error) {
        // Mostrar mensaje de error en caso de fallo
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar el producto",
        });
      }
    };
  
  
  
    // FUNCION DE CONVERSIÓN DE FECHAS 🌟🌟🌟
  
    function convertirFechaDatetimeAFecha(fechaDatetimeStr) {
      // Convertir la cadena de datetime a un objeto Date
      const fecha = new Date(fechaDatetimeStr);
  
      // Verificar si la fecha es válida
      // if (isNaN(fecha)) {
      //     throw new Error("Fecha inválida");
      // }
  
      // Obtener el día, mes y año
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses comienzan desde 0
      const año = fecha.getFullYear();
  
      // Retornar la fecha en formato dd/mm/yyyy
      return `${año}-${mes}-${dia}`;
  }
  
  </script>
  <style>
  
  </style>
  <main class="row m-0">
    <div class="col-12 col-md-8 mx-auto pt-3 mb-4 mb-md-0">
        
        <h3>Nueva entrada</h3>

      <form on:submit={handleSubmit}>
        <div class="card p-3">
          
          <h3 class="text-center">{nombre} x{cantidad} {unidad_producto}</h3>
          
          <div class="row mx-auto pt-3">

            <div class="col-12 my-auto col-md-4">
                <div class="input-group input-group-static my-2">
                    <label for="stock">Cantidad de entrada por {unidad_producto}</label>
                    <input type="number" class="form-control" bind:value={stock} required />
                </div>
            </div>

            <div class="col-12 col-md-8">
                <div class="input-group input-group-static my-2">
                  <label for="descripcion">Observación</label>
                  <textarea class="form-control" bind:value={descripcion}></textarea>
                </div>
              </div>
  
            <div class="col-12 text-center mt-4">
              <a href="/productos" class="btn btn-danger">cancelar</a>
              <button type="submit" class="btn btn-success">Agregar entrada</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
  