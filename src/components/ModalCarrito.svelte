<!-- src/components/Modal.svelte -->
<script>
  import { Router, Route, link } from 'svelte-routing';
  import { isModalOpen } from "../stores/modalStore.js";
  import Carrito from "./carrito.svelte";
  import { vaciarCarrito } from '../stores/cart.js';

  import { onMount } from "svelte";
  import { fetchUserProfile } from '../api/user.js';
  import { user } from '../stores/user.js'; // Store para guardar los datos del usuario

  import { cart } from '../stores/cart.js';

  let cartItems = [];
    cart.subscribe(value => {
      cartItems = value;
    });

  let userProfile = {};

  // Llamar a la función al montar el componente
  onMount(async () => {
      try {
          userProfile = await fetchUserProfile();
          user.set(userProfile); // Guardar los datos en el store
      } catch (error) {
          console.error('No se pudo obtener el perfil del usuario:', error);
      }
  });

  import Swal from 'sweetalert2';

  function login() {
    Swal.fire({
      title: "Debes iniciar sesión para continuar con tu pedido.",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Inicar sesión',
      cancelButtonText: 'volver'
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirigir a otra página
        window.location.href = '/login'; // Cambia por la URL deseada
      }
    });
  }
  
  // Función para cerrar el modal al hacer clic fuera del contenido
  function handleClickOutside(event) {
    if (event.target.classList.contains("modal")) {
      isModalOpen.set(false);
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="modal" class:open={$isModalOpen} on:click={handleClickOutside} role="dialog" aria-modal="true">
  <div class="modal-content">
    <div class="col">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <span class="close position-absolute text-center text-gray" on:click={() => isModalOpen.set(false)}>&times;</span>
    </div>
    <p class="text-dark text-bold text-2xl">Carrito</p>
    <Carrito />
    <div class="barra bg-white">
      <div class="row text-center mt-4 mb-n2">
        <div class="col-6">
          {#if cartItems.length === 0}
            <button class="btn btn-sm btn-danger" on:click={vaciarCarrito} disabled>vaciar carrito</button>
          {:else}
            <button class="btn btn-sm btn-danger" on:click={vaciarCarrito}>vaciar carrito</button>
          {/if}
        </div>
        {#if userProfile && userProfile.nombres}
          {#if cartItems.length === 0}
            <div class="col-6">
              <button class="btn btn-sm btn-success" disabled>Confirmar pedido</button>
            </div>
            {:else}
            <a use:link href="/pedido" class="col-6">
              <button class="btn btn-sm btn-success">Confirmar pedido</button>
            </a>
          {/if}
        {:else}
          <div class="col-6">
            <button class="btn btn-sm btn-success"  on:click={login} on:click={() => isModalOpen.set(false)} disabled>Confirmar pedido</button>
          </div>
        {/if}
      </div>
    </div>
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
