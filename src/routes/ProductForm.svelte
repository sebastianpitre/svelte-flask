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
    <form on:submit={handleSubmit}>
      <div class="card p-3">
        
        <h3 class="text-center">{id ? "Editar Producto" : "Guardar Producto"}</h3>
        
        <div class="row mx-auto pt-3">
          <div class="col-auto">
            <div class="text-center  border p-2 border-radius-2xl">
              <span class="">Activo? {is_activo === true ? 'Si': 'No' }</span>
              <div class="form-check form-switch ms-4 mb-3">
                <input type="checkbox" class="form-check-input" bind:checked={is_activo} />
              </div>
            </div>
          </div>
          <div class="col-7 col-md-4 {id ? 'd-none' : ''}">
            <div class="input-group input-group-static my-2">
              <label for="sku">SKU</label>
              <input type="text" class="form-control" bind:value={sku} required={!id} />
            </div>
          </div>

          <div class="col-12 col-md-6 {id ? "col-md-10" : ""}">
            <div class="input-group input-group-static my-2">
              <label for="nombre">Nombre</label>
              <input type="text" class="form-control" bind:value={nombre} required />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="descripcion">Descripción</label>
              <textarea class="form-control" bind:value={descripcion} required></textarea>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="url_imagen">URL Imagen</label>
              <input type="url" class="form-control" bind:value={url_imagen} required />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="url_ficha_tecnica">URL Ficha Técnica</label>
              <input type="url" class="form-control" bind:value={url_ficha_tecnica} />
            </div>
          </div>
          
          <div class="col-12 col-md-3">
            <div class="input-group input-group-static my-2">
              <label for="cantidad">Cantidad de unidad</label>
              <input type="number" class="form-control" bind:value={cantidad} required />
            </div>
          </div>

          <div class="col-12 col-md-3">
            <label for="unidad_producto" class="form-label">Unidad de medida</label>
            <div class="input-group input-group-outline mb-3 mt-n1">
                <select class="form-control" bind:value={unidad_producto} required>
                    <option value="" selected>Seleccionar</option>
                    <option value="KG" >Kilogramo</option>
                    <option value="GR" >Gramo</option>
                    <option value="L" >Litro</option>
                    <option value="ML" >Mililitro</option>
                    <option value="UD" >Unidad</option>
                    
                    <!-- Agrega más opciones según sea necesario -->
                </select>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="input-group input-group-static my-2">
              <label for="precio">Precio</label>
              <input type="number" class="form-control" bind:value={precio} required />
            </div>
          </div>

          <div class="col-auto">
            <div class="border-radius-2xl border p-2">
              <span>Decuento?</span>
              <div class="form-check form-switch"><span>{is_promocion === true ? 'Si': 'No' }</span> 
                <input type="checkbox" class="form-check-input" bind:checked={is_promocion} />
              </div>
            </div>
          </div>

          <div class="col-6 col-md-2 {is_promocion === false ? 'd-none': '' }">
            <div class="input-group input-group-static my-2">
              <label for="descuento">% Descuento</label>
              <input type="number" placeholder="cuanto es el % ?" class="form-control" bind:value={descuento} />
            </div>
          </div>

          <div class="col">
            <label for="id_categorias" class="form-label">Categoría</label>
            <div class="input-group input-group-outline mb-3 mt-n2">
                <select class="form-control" bind:value={id_categorias} required>
                  {#each categorias as item}
                  <option value={item.id_categorias}>{item.nombre}</option>
                  {/each}
                </select>
            </div>
          </div>

          <div class="col-12 col-md-3 d-none">
            <div class="input-group input-group-static my-2">
              <label for="stock">Stock</label>
              <input type="number" class="form-control" disabled bind:value={stock} required />
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6">
              <div>
                <label for="fecha_inicio_descuento" class="form-label ms-n1 ps-1">Inicio Descuento</label>
                <input type="date" class="form-control" bind:value={fecha_inicio_descuento} />
              </div>
            </div>
  
            <div class="col-12 col-md-6">
              <div>
                <label for="fecha_fin_descuento" class="form-label">Fin Descuento</label>
                <input type="date" class="form-control" bind:value={fecha_fin_descuento} />
              </div>
            </div>
          </div>

          <div class="col-12 text-center mt-4">
            <a href="/productos" class="btn btn-danger">cancelar</a>
            <button type="submit" class="btn btn-success">{id ? "Actualizar Producto" : "Guardar Producto"}</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</main>
