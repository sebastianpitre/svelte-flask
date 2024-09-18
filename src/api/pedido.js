// Importamos las funciones necesarias para interactuar con la API y la tienda de Svelte
import { getProductosPublicos } from './productos';
import { get } from 'svelte/store';
import { cart } from '../stores/cart';
import { fetchWithAuth } from './auth'; // Usar fetchWithAuth si ya tienes token, ajustado en el fetch.

export async function createPedido() {
    try {
        // Obtenemos el carrito desde el store de Svelte
        const carrito = get(cart);

        if (carrito.length === 0) {
            console.warn('El carrito está vacío');
            return;  // No hacer nada si el carrito está vacío
        }


        // Extraemos los IDs de los productos que están en el carrito
        const idsProductos = carrito.map(item => item.id);

        // Llamamos a la API para obtener todos los productos, luego filtramos solo los que están en el carrito
        const productosData = await getProductosPublicos();

        // Filtramos los productos que están en el carrito
        const productosEnCarrito = productosData.filter(producto => idsProductos.includes(producto.id));

        // SE CREA EL ARRAY DE PRODUCTOS
        const pedidoProductosDto = carrito.map(item => {
            // SE LLAMAN LOS DATOS DEL CARRITO
            const producto = productosEnCarrito.find(p => p.id === item.id);

            // DATOS A ENVIAR POR PRODUCTO
            return {
                id: producto.id,  // El ID del producto
                cantidad: item.quantity,  // Cantidad del producto en el carrito
                precio: producto.precio  // Precio del producto
            };
        });

        // Calculamos el monto total del pedido sumando el total de cada producto
        const montoTotal = pedidoProductosDto.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        

        // Creamos el objeto del pedido, que contiene todos los datos necesarios para la API
        const pedido = {
            monto_total: montoTotal,  // Monto total del pedido
            // estado_pedido: "PENDIENTE",  // Estado del pedido, en este caso "PENDIENTE"
            productos: pedidoProductosDto  // LISTADO DE DATOS A ENVIAR POR PRODUCTO
        };

        // Enviamos el pedido a la API usando fetchWithAuth, que maneja la autenticación
        const response = await fetchWithAuth('http://127.0.0.1:5000/api/usuarios/pedidos', {
            method: 'POST',  // Usamos el método POST para enviar el pedido
            headers: {
                'Content-Type': 'application/json'  // Indicamos que estamos enviando datos en formato JSON
            },
            body: JSON.stringify(pedido)  // Convertimos el objeto pedido a JSON para enviarlo en el body
        });

        // Verificamos si la respuesta no es OK, lo que indicaría un error
        if (!response.ok) {
            throw new Error('Error al crear el pedido');  // Lanzamos un error si algo sale mal
        }

        // Si todo salió bien, obtenemos la respuesta en formato JSON
        const data = await response.json();
        console.log('Pedido creado con éxito:', data);  // Imprimimos el resultado en la consola
    } catch (error) {
        console.error('Error al crear el pedido:', error);  // Capturamos e imprimimos cualquier error que ocurra
    }
}
