// Importamos las funciones necesarias para interactuar con la API y la tienda de Svelte
import { getProductosAPedir } from './productos';
import { get } from 'svelte/store';
import { cart } from '../stores/cart';
import { fetchWithAuth } from './auth'; // Usar fetchWithAuth si ya tienes token, ajustado en el fetch.

export async function createPedido() {
    try {
        const carrito = get(cart);

        if (carrito.length === 0) {
            console.warn('El carrito está vacío');
            return;  
        }

        const idsProductos = carrito.map(item => item.id);
        const productosData = await getProductosAPedir();
        console.log('Productos obtenidos:', productosData); // Para depuración

        const productosEnCarrito = productosData.filter(producto => idsProductos.includes(producto.id));

        const pedidoProductosDto = carrito.map(item => {
            const producto = productosEnCarrito.find(p => p.id === item.id);
            return {
                id: producto.id,
                cantidad: item.quantity,
                precio: producto.precio
            };
        });

        const montoTotal = pedidoProductosDto.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        const pedido = {
            monto_total: montoTotal,
            productos: pedidoProductosDto
        };

        console.log('Datos del pedido:', JSON.stringify(pedido)); // Para depuración

        const response = await fetchWithAuth('http://127.0.0.1:5000/api/usuarios/pedidos', {
            method: 'POST',
            body: JSON.stringify(pedido)
        });

        // Aquí manejamos la respuesta del fetchWithAuth
        if (response) {
            console.log("Pedido creado con éxito:", response);
            return response; // Retornamos los datos del pedido creado
        } else {
            throw new Error('Error al crear el pedido: respuesta no válida');
        }
        
    } catch (error) {
        console.error('Error al crear el pedido:', error.message || error);
        throw error; // Asegúrate de volver a lanzar el error
    }
}

