<script>
    import { onMount } from 'svelte';
    import { fetchWithAuth } from '../api/auth'; // Verifica que la ruta sea correcta
  import { getProductos } from '../api/productos.js';


    // Recibir el `id` como prop
    export let id;
  
    let productosx = []; // Lista de todos los productos disponibles
    let errorMessage = '';
    // Variable para almacenar el pedido
    let pedido = null;
  
    // Función para obtener los productos disponibles
    async function fetchProductos() {
      try {
        productosx = await getProductos();
      } catch (error) {
        errorMessage = 'No se pudieron cargar los productos.';
        console.error(error);
      }
    }
    async function fetchPedido() {
    try {
        // Aquí `response` es el objeto de datos directamente
        const data = await fetchWithAuth(`http://127.0.0.1:5000/api/usuarios/pedidos/${id}`);
        console.log('Datos recibidos:', data);

        // Ahora verifica si data es el cuerpo de respuesta esperado
        pedido = data;
        console.log('Pedido obtenido:', pedido);
    } catch (error) {
        console.error('Error:', error);
    }
    }

    // Variable para controlar la visibilidad del div
    let mostrarDiv = true;
    let sombra = 'card';

    // Función para ocultar el div por 3 segundos
    function ocultarDiv() {
        printReceipt()
        mostrarDiv = false; // Oculta el div
        sombra = '';
        
        // Después de 3 segundos, vuelve a mostrar el div
        setTimeout(() => {
            mostrarDiv = true;
            sombra = 'card';
        }, 3000); // 3000 ms = 3 segundos
    }

    // Función auxiliar para obtener el nombre del producto por su ID
  function obtenerNombreProducto(idProducto) {
    const productoEncontrado = productosx.find((prod) => prod.id === idProducto);
    return productoEncontrado ? productoEncontrado.nombre : 'Producto';
  }

  function obtenerCantidad(idProducto) {
    const productoCantidad = productosx.find((prod) => prod.id === idProducto);
    return productoCantidad ? productoCantidad.cantidad : '';
  }

  function obtenerCantidadUnidad(idProducto) {
    const productoCantidad = productosx.find((prod) => prod.id === idProducto);
    return productoCantidad ? productoCantidad.unidad_producto : '.';
  }

    // Llama a la función al montar el componente
    onMount(() => {
        console.log('ID del pedido:', id);
      if (id) {
        fetchProductos(); // Primero carga los productos disponibles
        fetchPedido();
      }
    });

     // Función para imprimir el recibo
     function printReceipt() {
      setTimeout(() => {
        window.print();
        }, 1000); // 3000 ms = 3 segundos
        
    }

    // Función para formatear la fecha en español
    function formatearFecha(fechaISO) {
        const fecha = new Date(fechaISO);
        
        // Formatear la fecha en español
        const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada = new Intl.DateTimeFormat('es-ES', opcionesFecha).format(fecha);
        
        // Obtener la hora por separado
        const opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const horaFormateada = new Intl.DateTimeFormat('es-ES', opcionesHora).format(fecha);

        return { fechaFormateada, horaFormateada };
    }
  </script>
<main>
    {#if pedido}
      <div class="mx-auto mt-5 col-12 col-md-4">

        {#if mostrarDiv}
          <a class="btn btn-dark btn-sm" href="/">Volver</a>
            <!-- Botón para imprimir el recibo -->
          <button class="btn btn-primary btn-sm mb-3" on:click={ocultarDiv}>Imprimir Recibo</button>
        {/if}
        
        <div class="ticket {sombra}  bg-white  px-5 py-3">
          <div class="text-lateral">
            <strong class="border-top text-dark border-bottom border-2" style="border-color: black;">
              Vigilado
            </strong>
            Centro Biotecnológico del Caribe <strong >(CBC)</strong>
          </div>
  
          <h3>Detalles del Pedido</h3>
          <p><strong>N° Pedido:</strong> {pedido.id_pedido}</p>
          <p><strong>Estado:</strong> {pedido.estado_pedido}</p>
          <p><strong>Fecha creación: </strong>{formatearFecha(pedido.fecha_creacion).fechaFormateada}</p>

    
          <h5>Productos</h5>
          <div class=" border">
            <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-dark text-xxs font-weight-bolder pe-0">Descripcion</th>
                    <th class="text-uppercase text-dark text-xxs font-weight-bolder text-center">Cantidad</th>
                    <th class="text-uppercase text-dark text-xxs font-weight-bolder text-center">precio</th>
                  </tr>
                </thead>
                <tbody>
                  {#if pedido.productos && pedido.productos.length > 0}
                  {#each pedido.productos as producto}
                  <tr>
                      <td class="text-xs text-dark font-weight-bolder border-0 ps-4">{obtenerNombreProducto(producto.id)} x{obtenerCantidad(producto.id)} {obtenerCantidadUnidad(producto.id)}</td>
                      <td class="text-xs text-dark font-weight-bolder border-0 text-center">{producto.cantidad}</td>
                      <td class="text-xs text-dark font-weight-bolder border-0 text-center">{producto.precio}</td>
                  </tr>
                  {/each}
                  {:else}
                    <p>No hay productos en este pedido.</p>
                  {/if}
                </tbody>
            </table>
            
          </div>

          <p class="text-end mt-2"><strong>Total:</strong> {pedido.monto_total}</p>

  
          
        </div>
      </div>
      
    {:else}
      <p>Cargando el pedido...</p>
    {/if}
  </main>
  
  <style>

    .ticket{
      position: relative;
    }

    .text-lateral{
      position: absolute;
      transform: rotate(-90deg);
      bottom: 145px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.418);
      left: -117px;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }
  </style>