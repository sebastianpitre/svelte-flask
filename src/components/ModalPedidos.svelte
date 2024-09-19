<script>
  import { isModalOpenPedidos } from "../stores/modalStore.js";
  import { onMount, onDestroy } from 'svelte';
  import { idStore } from '../stores/modalStore.js';
  import { fetchWithAuth } from '../api/auth'; // Verifica que la ruta sea correcta

  let pedido = null;
  let errorMessage = '';
  let id;

  const unsubscribe = idStore.subscribe(value => {
    id = value; // Actualiza el ID cuando cambia el valor en el store
  });

onMount(async () => {
  if (id) {
    try {
      const apiUrl = `http://127.0.0.1:5000/api/usuarios/pedidos/${id}`;
      console.log('Haciendo solicitud a:', apiUrl); // Verifica la URL

      const response = await fetchWithAuth(apiUrl);
      if (!response.ok) throw new Error('Error al obtener el pedido');

      const data = await response.json();
      console.log('Datos recibidos:', data); // Verifica los datos recibidos

      if (!data || !data.id_pedido) {
        errorMessage = 'No hay información del pedido disponible.';
      } else {
        pedido = data; // Asigna el resultado al pedido
      }
    } catch (error) {
      errorMessage = error.message; // Manejo de errores
      console.error('Error al obtener el pedido:', error);
    }
  }
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
    <span class="close" on:click={() => isModalOpenPedidos.set(false)}>&times;</span>
    <p>Información del pedido</p>
    id: {id}
    {#if errorMessage}
      <p>{errorMessage}</p>
    {:else if pedido}
      <p><strong>ID del pedido:</strong> {pedido.id_pedido}</p>
      <p><strong>Monto total:</strong> {pedido.monto_total}</p>
      <p><strong>Estado del pedido:</strong> {pedido.estado_pedido}</p>
      <p><strong>Fecha de creación:</strong> {pedido.fecha_creacion}</p>
      <p><strong>ID del usuario:</strong> {pedido.id_usuario}</p>
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
