<!-- src/components/Modal.svelte -->
<script>
  import { link } from 'svelte-routing';
  import { onMount } from "svelte";
  import { isModalOpenPedidos } from "../stores/modalStore.js";

  export let id; // ID recibido como prop
  
  let producto;

  // Cargar los datos del producto basado en el ID recibido
  $: if (id) {
    fetch(`http://127.0.0.1:5000/api/usuarios/pedidos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        producto = data;
      });
  }


  // Función para cerrar el modal al hacer clic fuera del contenido
  function handleClickOutside(event) {
    if (event.target.classList.contains("modal")) {
      isModalOpenPedidos.set(false);
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="modal" class:open={$isModalOpenPedidos} on:click={handleClickOutside} role="dialog" aria-modal="true">
  <div class="modal-content">
    <div class="col">
      <span class="close position-absolute text-center text-gray" on:click={() => isModalOpenPedidos.set(false)}>&times;</span>
    </div>
    <p class="text-dark text-bold text-2xl">Informacion de pedidos</p>

    {producto}
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
