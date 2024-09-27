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
  let cantidad = 0;
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
          fecha_inicio_descuento = product.fecha_inicio_descuento || null;
          fecha_fin_descuento = product.fecha_fin_descuento || null;

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
</script>

<main class="row m-0">
  <div class="col-12 col-md-8 mx-auto pt-3 mb-4 mb-md-0">
    <form on:submit={handleSubmit}>
      <div class="card p-3">
        <h3 class="text-center">{id ? "Editar Producto" : "Guardar Producto"}</h3>
        <div class="row mx-auto pt-3">
          <div class="col-12 col-md-6 {id ? 'd-none' : ''}">
            <div class="input-group input-group-static my-2">
              <label for="sku">SKU</label>
              <input type="text" class="form-control" bind:value={sku} required={!id} />
            </div>
          </div>

          <div class="col-12 col-md-6">
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

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="unidad_producto">Unidad de Producto</label>
              <input type="text" class="form-control" bind:value={unidad_producto} required />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="cantidad">Cantidad</label>
              <input type="number" class="form-control" bind:value={cantidad} required />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="precio">Precio</label>
              <input type="number" class="form-control" bind:value={precio} required />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="descuento">Descuento</label>
              <input type="number" class="form-control" bind:value={descuento} />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="input-group input-group-static my-2">
              <label for="stock">Stock</label>
              <input type="number" class="form-control" bind:value={stock} required />
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="form-check form-switch my-2">
              <label for="is_promocion" class="form-check-label">Promoción</label>
              <input type="checkbox" class="form-check-input" bind:checked={is_promocion} />
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="form-check form-switch my-2">
              <label for="is_activo" class="form-check-label">Activo</label>
              <input type="checkbox" class="form-check-input" bind:checked={is_activo} />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div>
              <label for="fecha_inicio_descuento" class="form-label">Inicio Descuento</label>
              <input type="date" class="form-control" bind:value={fecha_inicio_descuento} />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div>
              <label for="fecha_fin_descuento" class="form-label">Fin Descuento</label>
              <input type="date" class="form-control" bind:value={fecha_fin_descuento} />
            </div>
          </div>

          <div class="col-6">
            <div class="input-group input-group-static my-2">
              <p for="id_categorias">Categoría</p>
              <select class="form-select" bind:value={id_categorias} required>
                {#each categorias as categoria}
                  <option value={categoria.id}>{categoria.nombre}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="col-12 text-center mt-4">
            <button type="submit" class="btn btn-success">{id ? "Actualizar Producto" : "Crear Producto"}</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</main>
