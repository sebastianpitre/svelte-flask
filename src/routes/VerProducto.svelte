<script>
  import { onMount } from 'svelte';

  // Importar la tienda del carrito y funciones para modificarla
  import { cart, addToCart, incrementQuantity, decrementQuantity } from '../stores/cart';
  import Nav from '../components/nav.svelte';

  // Recibir el `id` como prop
  export let id;

  // Variable para almacenar el producto
  let producto = null;
  let errorMessage = ''; // Variable para almacenar mensajes de error

  // Variables para el estado del carrito
  let isInCart = false;
  let itemQuantity = 0;

  // Función para obtener el producto
  async function fetchProducto() {
    try {
      // Realiza la solicitud para obtener el producto por ID
      const response = await fetch(`http://127.0.0.1:5000/api/publico/productos/${id}`);

      // Verifica si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('No se pudo obtener el producto');
      }

      // Convierte la respuesta en un objeto JSON
      const data = await response.json();
      console.log('Datos recibidos:', data);

      // Asigna el producto obtenido
      producto = data;
      console.log('Producto obtenido:', producto);

      // Verificar si el producto ya está en el carrito
      checkCartStatus();
    } catch (error) {
      // Muestra el error en consola y guarda un mensaje de error
      console.error('Error:', error);
      errorMessage = 'No se pudo cargar el producto.';
    }
  }

  // Verificar si el producto está en el carrito
  function checkCartStatus() {
    const cartItems = $cart; // Obtiene el estado actual del carrito
    const item = cartItems.find(item => item.id === producto.id);
    isInCart = !!item;
    itemQuantity = item ? item.quantity : 0;
  }

  // Llama a la función al montar el componente
  onMount(() => {
    console.log('ID del producto:', id);
    if (id) {
      fetchProducto();
    }
  });

  // Función para agregar al carrito
  function handleAddToCart() {
    addToCart(producto); // Llama a la función de la tienda del carrito
    checkCartStatus(); // Actualiza el estado del carrito
  }

  // Función para incrementar la cantidad
  function handleIncrement() {
    incrementQuantity(producto.id); // Incrementa la cantidad en el carrito
    checkCartStatus(); // Actualiza el estado del carrito
  }

  // Función para decrementar la cantidad
  function handleDecrement() {
    decrementQuantity(producto.id); // Decrementa la cantidad en el carrito
    checkCartStatus(); // Actualiza el estado del carrito
  }


  // COPIAR urlFichaTecnica PRODUCTO

 
</script>

<main>
  <Nav/>
  {#if producto}
    <h2>Detalles del producto</h2>
    <div>
      <div class="row">
        <div class="col-12 col-md-4 mb-4">
          <img class="w-100" src="{producto.url_imagen}" alt="">
        </div>
        <div class="col">
          <p><strong>Nombre del producto:</strong> {producto.nombre}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio:</strong> {producto.precio}</p>
          <p><strong>categoria:</strong> {producto.id_categorias}</p>
          <p><strong>Url ficha tecnica:</strong> {producto.url_ficha_tecnica}</p>

          {#if producto.is_activo}
            {#if isInCart}
              <div>
                <button class="btn col btn-sm border border-dark" on:click={handleDecrement}>-</button>
                <span class="col p-1 btn disabled text-dark">{itemQuantity} {producto.unidad_producto}</span>
                <button class="btn col btn-sm border border-success text-success" on:click={handleIncrement}>+</button>
              </div>
            {:else}
              <button class="btn col-3 btn-sm btn-success" on:click={handleAddToCart}>Agregar</button>
            {/if}
          {:else}
            <button class="btn col-4 btn-sm bg-info text-white invalid disabled">Disponible pronto</button>
          {/if}
        </div>
      </div>
      

      

    </div>
  {:else if errorMessage}
    <p>{errorMessage}</p>
  {:else}
    <p>Cargando el producto...</p>
  {/if}
</main>

