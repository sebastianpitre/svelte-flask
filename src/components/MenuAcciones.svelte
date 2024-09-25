<!-- <div class="row m-0"> -->
<!-- Pequisistos: tener un row con m-0 y llamar este componente dentro -->
 <!-- Poner style="margin-left: 4.5rem;" al contenido de la derecha -->
<div class="">
  <div id="sidebar" class="d-flex flex-column" style="background-color: black;">
      <a href="/" class="border-bottom text-center mt-2 pb-1">
          <img class="mb-n1" src="/public/img/logo.svg" alt="imglogo" style="width: 30px;">
          <span class="text-white">Vitrina</span>
      </a>
      <a class="p-1 text-center link-menu border-bottom border-top mx-2 mt-auto" href="/" >
          <span class="material-symbols-outlined" style=" font-size: 35px;">home_app_logo</span>
          <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Home</p>
      </a>
      <a class="p-1 text-center link-menu border-bottom mx-2" href="/productos" >
          <span class="material-symbols-outlined" style=" font-size: 35px;">inventory</span>
          <p class="m-0 mt-n3 pt-1 text-white ms-n1" style="font-size: 11px;">Productos</p>
      </a>
      <a class="p-1 text-center link-menu border-bottom mx-2" href="/categorias" >
          <span class="material-symbols-outlined" style=" font-size: 35px;">category</span>
          <p class="m-0 mt-n3 pt-1 text-white ms-n1" style="font-size: 11px;">Categorias</p>
      </a>
      <a class="p-1 text-center link-menu border-bottom mx-2" href="/pedidos_admin" >
          <span class="material-symbols-outlined" style=" font-size: 35px;">contract</span>
          <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Pedidos</p>
      </a>
      <a class="p-1 text-center link-menu border-bottom mx-2" href="/usuarios" >
          <span class="material-symbols-outlined" style=" font-size: 35px;">group</span>
          <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Usuarios</p>
      </a>
      <a class="p-1 text-center link-menu border-bottom mx-2" href="/" >
          <span class="material-symbols-outlined" style=" font-size: 35px;">settings</span>
          <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Ajustes</p>
      </a>

      <!-- Botón Dropdown en el fondo -->
          <a class="p-1 text-center link-menu border-top mt-auto" href="/cuenta" >
              <span class="material-symbols-outlined" style=" font-size: 35px;">person</span>
              <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Sebastian</p>
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



  .link-menu{
      color: white;
  }
  .link-menu:hover {
      color: #39a900 ;
  }

</style>