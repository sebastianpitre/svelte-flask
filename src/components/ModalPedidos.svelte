<script>
  import { isModalOpenPedidos, idStore } from "../stores/modalStore.js";
  import { onMount, onDestroy } from 'svelte';
  import { fetchWithAuth } from '../api/auth'; // Verifica que la ruta sea correcta
  import { getProductos } from '../api/productos';

  let productosx = []; // Lista de todos los productos disponibles
  let pedido = null;
  let errorMessage = '';
  let id;

  // Suscripción al idStore
  const unsubscribe = idStore.subscribe(async value => {
    id = value; // Actualiza el ID cuando cambia el valor en el store
    if (id) {
      await fetchPedido(); // Llama a fetchPedido cuando el id cambia
    }
  });

  // Función para obtener los productos disponibles
  async function fetchProductos() {
    try {
      productosx = await getProductos();
    } catch (error) {
      errorMessage = 'No se pudieron cargar los productos.';
      console.error(error);
    }
  }

  // Función para obtener el pedido por id
  async function fetchPedido() {
    if (id) {
      try {
        // Aquí `response` es el objeto de datos directamente
        const data = await fetchWithAuth(`http://127.0.0.1:5000/api/usuarios/pedidos/${id}`);
        console.log('Datos recibidos:', data);

        // Ahora verifica si data es el cuerpo de respuesta esperado
        pedido = data;
        console.log('Pedido obtenido:', pedido);
      } catch (error) {
        console.error('Error:', error);
        errorMessage = 'No se pudo obtener el pedido.';
      }
    }
  }
  // Función auxiliar para obtener el nombre del producto por su ID
  function obtenerNombreProducto(idProducto) {
    const productoEncontrado = productosx.find((prod) => prod.id === idProducto);
    return productoEncontrado ? productoEncontrado.nombre : 'Producto no encontrado';
  }

  // Llama a las funciones al montar el componente
  onMount(async () => {
      await fetchProductos(); // Primero carga los productos disponibles
      await fetchPedido(); // Luego carga el pedido
    });
  // Limpia la suscripción al desmontar el componente
  onDestroy(() => {
    unsubscribe();
  });

  function handleClickOutside(event) {
    if (event.target.classList.contains("modal")) {
      isModalOpenPedidos.set(false); // Cierra el modal
    }
  }
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="modal" class:open={$isModalOpenPedidos} on:click={handleClickOutside} role="dialog" aria-modal="true">
  <div class="modal-content">
    <div class="col mt-n4 text-end">
      <span class="close" on:click={() => isModalOpenPedidos.set(false)}>&times;</span>
    </div>
    {#if pedido}
      <div>
        <h4>Información del Pedido</h4>

        <div class="row">
          <div class="col-12">
            <span class="">ID del pedido - {pedido.id_pedido}  </span>

          </div>
          <div class="col-12">
            <span class="">Monto total - {pedido.monto_total}  </span>
          </div>
          <div class="col-12">
            <span class="">Estado del pedido - 
              {#if pedido.estado_pedido === "PENDIENTE"}
              <span class="text-info font-weight-bold"> {pedido.estado_pedido}  </span>
                  {:else if pedido.estado_pedido === "APROBADO"}
                  <span class="text-success font-weight-bold"> {pedido.estado_pedido}  </span>
                  {:else if pedido.estado_pedido === "CANCELADO"}
                  <span class="text-danger font-weight-bold"> {pedido.estado_pedido} ❌  </span>
                  {:else if pedido.estado_pedido === "ENTREGADO"}
                  <span class="text-success font-weight-bold"> {pedido.estado_pedido}✅  </span>
              {/if} 
            </span>
          </div>
          <div class="col-12">
            <span class="">Fecha de creacion - {pedido.fecha_creacion}  </span>
          </div>
          <div class="col-12">
            <span class="">ID del usuario - 1 </span>
          </div>
        </div>

        <h4 class="mt-3">Productos del Pedido</h4>
        <div class=" border table-responsive">
          <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder ps-4 pe-0">id</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder pe-0">nombre de producto</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center">Cantidad</th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center">precio</th>
                </tr>
              </thead>
              <tbody>
                {#if pedido.productos && pedido.productos.length > 0}
                {#each pedido.productos as producto}
                <tr>
                    <td class="text-xs font-weight-bolder border-0 ps-4">{producto.id}</td>
                    <td class="text-xs font-weight-bolder border-0 ps-4">{obtenerNombreProducto(producto.id)}</td>
                    <td class="text-xs font-weight-bolder border-0 text-center">{producto.cantidad}</td>
                    <td class="text-xs font-weight-bolder border-0 text-center">{producto.precio}</td>
                </tr>
                {/each}
                {:else}
                  <p>No hay productos en este pedido.</p>
                {/if}
              </tbody>
          </table>
        </div>
      </div>
    {:else if errorMessage}
      <p>{errorMessage}</p>
    {:else}
      <p>Cargando información del pedido...</p>
    {/if}
  </div>
</div>

<style>
  .modal {
    display: none;
    position: fixed;
    z-index: 9999;
    padding-top: 50px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal.open {
    display: block;
  }

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 85%;
  }

  .close {
    color: #aaa;
    font-size: 40px;
    font-weight: bold;
    width: 50px;
    top: -7px;
    right: 0px;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
</style>
