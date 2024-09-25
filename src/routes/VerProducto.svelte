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

  let isFading = false;
  // Función para agregar al carrito
  function handleAddToCart() {
    isFading = true; // Activa el efecto de desvanecimiento
    setTimeout(() => {
      addToCart(producto); // Llama a la función de la tienda del carrito
      checkCartStatus(); // Actualiza el estado del carrito
      isFading = false; // Restaura el estado del botón si lo necesitas para futuras acciones
    }, 500); // Coincide con la duración de la animación CSS

    
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

 // Función para copiar el valor al portapapeles

    let mensajeCopiado = false; // Estado para controlar la visibilidad del mensaje

    // Función para copiar el valor al portapapeles y mostrar el mensaje temporalmente
    const copiarAlPortapapeles = async () => {
        try {
            await navigator.clipboard.writeText(producto.url_ficha_tecnica);
            mensajeCopiado = true; // Mostrar el mensaje
            setTimeout(() => {
                mensajeCopiado = false; // Ocultar el mensaje después de 2 segundos
            }, 2000);
        } catch (err) {
            console.error("Error al copiar: ", err);
        }
    };
</script>

<main>
  <Nav/>
  <div class="container">
    {#if producto}
    <h4>Detalles del producto</h4>
    <div class="card p-4">
      <div class="row">
        <div class="col-12 col-md-5 mb-4">
          <img class="w-100" src="{producto.url_imagen}" alt="">
        </div>
        <div class="col">
          <h5>{producto.nombre}</h5>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>categoria:</strong> {producto.id_categorias}</p>
          <div class="row">
            <div class="col-auto">
              <button class="btn py-0 px-2 btn-sm bg-info text-white" on:click={copiarAlPortapapeles}>Copiar ficha tecnica</button>
            </div>
            <div class="mt-n4" style="width: 110px;">
              {#if mensajeCopiado}
                <div class="badge bg-gray-700">
                    ¡Copiado!
                </div>
              {/if}
            </div>
          </div>

          <style>
            /* Efecto de brillo radiante y desvanecimiento */
            .glow-fade {
              animation: glow 0.7s ease-in-out, fade 0.7s ease-in-out;
            }

            /* Animación de brillo */
            @keyframes glow {
              0% {
                box-shadow: 0 0 5px rgba(0, 255, 0, 0.5), 0 0 10px rgba(0, 255, 0, 0.5);
              }
              100% {
                box-shadow: 0 0 15px rgba(0, 255, 0, 1), 0 0 30px rgba(0, 255, 0, 1);
              }
            }

            /* Animación de desvanecimiento */
            @keyframes fade {
              0% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }


          </style>
          {#if producto.is_activo}
            {#if isInCart}
              <div class="col-12">
                <button class="btn col btn-sm border border-dark" on:click={handleDecrement}>-</button>
                <span class="col p-1 btn disabled text-dark">{itemQuantity} {producto.unidad_producto}</span>
                <button class="btn col btn-sm border border-success text-success" on:click={handleIncrement}>+</button>
              </div>
            {:else}
            <button class="btn col btn-sm btn-success {isFading ? 'glow-fade' : ''}" on:click={handleAddToCart}>Agregar al carrito</button>
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
  </div>

  <style>
    body{
      background-color: #f0f2f5;
    }
  </style>
</main>


