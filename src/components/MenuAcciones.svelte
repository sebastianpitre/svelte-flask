<script>
    import { onMount } from "svelte";
    import { currentPath, updatePath } from '../stores/menu.js';
    import { fetchUserProfile } from '../api/user';
    import { user } from '../stores/user'; // Store para guardar los datos del usuario


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

    // condiciones del menu segun la pagia en que se encuentra
    function isActive(path) { return $currentPath === path ? 'bg-select' : 'mx-auto';}

    function selector(path) {return $currentPath === path ? 'selector' : 'no-selector';}

  // Llamar a la función al montar el componente
  onMount(async () => {
      try {
          userProfile = await fetchUserProfile();
          user.set(userProfile); // Guardar los datos en el store
      } catch (error) {
          console.error('No se pudo obtener el perfil del usuario:', error);
      }
  });

  import { logout } from '../api/auth';

  // cerrar sesion
    function handleLogout() {
        logout();
    }


</script>

<!-- <div class="row m-0"> -->
<!-- Pequisistos: tener un row con m-0 y llamar este componente dentro -->
 <!-- Poner style="margin-left: 4.5rem;" al contenido de la derecha -->
<div class="">
  <div id="sidebar" class="d-flex flex-column" style="background-color: black;">
      <a href="/" class="border-bottom text-center mt-2 pb-1">
          <img class="mb-n1" src="/public/img/logo.svg" alt="imglogo" style="width: 30px;">
          <span class="text-white">Vitrina</span>
      </a>
      <a class="p-1 text-center link-menu border-bottom border-top mx-2 mt-auto" href="/" on:click={() => updatePath('/')}>
          <span class="material-symbols-outlined simbolo-icon {isActive('/')}">home_app_logo</span>
          <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Home</p>
          <span class="{selector('/')}"></span>
      </a>
      <a class="p-1 text-center link-menu border-bottom mx-2" href="/productos" on:click={() => updatePath('/productos')}>
          <span class="material-symbols-outlined simbolo-icon {isActive('/productos')}">inventory</span>
          <p class="m-0 mt-n3 pt-1 text-white ms-n1" style="font-size: 11px;">Productos</p>
          <span class="{selector('/productos')}"></span>
      </a>
      <a class="p-1 text-center link-menu border-bottom mx-2" href="/categorias" on:click={() => updatePath('/categorias')}>
          <span class="material-symbols-outlined simbolo-icon {isActive('/categorias')}">category</span>
          <p class="m-0 mt-n3 pt-1 text-white ms-n1" style="font-size: 11px;">Categorias</p>
          <span class="{selector('/categorias')}"></span>
      </a>
      <a class="p-1 text-center link-menu border-bottom mx-2" href="/pedidos_admin" on:click={() => updatePath('/pedidos_admin')}>
          <span class="material-symbols-outlined simbolo-icon {isActive('/pedidos_admin')}">contract</span>
          <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Pedidos</p>
          <span class="{selector('/pedidos_admin')}"></span>
      </a>
      <a class="p-1 text-center link-menu border-bottom mx-2" href="/usuarios" on:click={() => updatePath('/usuarios')}>
          <span class="material-symbols-outlined simbolo-icon {isActive('/usuarios')}">group</span>
          <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Usuarios</p>
          <span class="{selector('/usuarios')}"></span>
      </a>
      <a class="p-1 text-center link-menu border-bottom mx-2" href="/" on:click={() => updatePath('/')}>
          <span class="material-symbols-outlined simbolo-icon {isActive('/')}">settings</span>
          <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Ajustes</p>
      </a>

        <!-- Botón Dropdown en el fondo -->
        <a class="p-1 text-center py-2     link-menu border-top mt-auto" href="/cuenta" >
            <span class="material-symbols-outlined">shield_person</span>
            <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 10px;">{userProfile.nombres}</p>
        </a>
  </div>
</div>

<style>
  /* Estilos para el menú lateral */
  #sidebar {
      width: 4.5rem;
      height: 100%; /* Altura completa de la ventana */
      position: fixed; /* Fijo en la página */
      top: 0;
      left: 0;
  }

  .selector{
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top: 0;
    border-bottom: 17px solid ;
    transform: rotate(30deg);

    color: #39a900;
    position: absolute;
    left: 57px;
    top: 20px;
    font-size: 40px;
  }

  .no-selector{
    display: none;
  }

  .simbolo-icon{
    font-size: 35px;
  }

  .link-menu{
    position: relative;
    color: white;
  }
  .link-menu:hover {
      color: #39a900 ;
  }
    
    .bg-select{
       color: #38a900a8;
       font-size: 40px;
    }

</style>
