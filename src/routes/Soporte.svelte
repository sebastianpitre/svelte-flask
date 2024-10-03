<script>
    import { onMount } from 'svelte';
    import { fetchWithAuth } from '../api/auth'; // Verifica que la ruta sea correcta

    // Recibir el `id` como prop
    export let id;
  
    // Variable para almacenar el pedido
    let pedido = null;
  
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


  
    // Llama a la función al montar el componente
    onMount(() => {
        console.log('ID del pedido:', id);
      if (id) {
        fetchPedido();
      }
    });
  </script>
<main>
    {#if pedido}
      <div class="mx-auto mt-5 col-12 col-md-4">
        <a class="btn btn-dark btn-sm" href="/">Volver</a>
        <div class="ticket card  bg-white  px-5 py-3">
          <div class="text-lateral">
            <strong class="border-top text-dark border-bottom border-2" style="border-color: black;">
              Vigilado
            </strong>
            Centro Biotecnológico del Caribe <strong >(CBC)</strong>
          </div>
  
          <h3>Detalles del Pedido</h3>
          <p><strong>N° Pedido:</strong> {pedido.id_pedido}</p>
          <p><strong>Monto Total:</strong> {pedido.monto_total}</p>
          <p><strong>Estado:</strong> {pedido.estado_pedido}</p>
          <p><strong>Fecha: </strong> {new Date(pedido.fecha_creacion).toLocaleString()}</p>
    
          <h5 class="border-top pt-2">Productos</h5>
          <ul>
            {#each pedido.productos as producto}
              <li>
                <strong>Producto ID:</strong> {producto.id} - 
                <strong>Cantidad:</strong> {producto.cantidad} - 
                <strong>Precio:</strong> {producto.precio}
              </li>
            {/each}
          </ul>
  
          
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