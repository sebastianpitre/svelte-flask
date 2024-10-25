// Importamos las funciones necesarias para interactuar con la API y la tienda de Svelte
import { getProductosAPedir } from './productos';
import { get } from 'svelte/store';
import { cart } from '../stores/cart';
import { fetchWithAuth } from './auth'; // Usar fetchWithAuth si ya tienes token, ajustado en el fetch.

// Inicializa el historial si no existe
function inicializarHistorial() {
    if (!localStorage.getItem('historial_pedido')) {
        localStorage.setItem('historial_pedido', JSON.stringify({}));
    }
}

// Actualiza el historial de pedidos en localStorage
function actualizarHistorialPedido(pedidoProductosDto) {
    // Asegúrate de que el historial esté inicializado
    inicializarHistorial();

    // Obtén el historial actual del localStorage
    let historialPedido = JSON.parse(localStorage.getItem('historial_pedido'));

    // Actualiza las cantidades en el historial para cada producto en el pedido
    pedidoProductosDto.forEach(item => {
        if (historialPedido[item.id]) {
            historialPedido[item.id] += item.cantidad;
        } else {
            historialPedido[item.id] = item.cantidad;
        }
    });

    // Guarda el historial actualizado en localStorage
    localStorage.setItem('historial_pedido', JSON.stringify(historialPedido));
}

export async function createPedido() {
    try {
        const carrito = get(cart);

        if (carrito.length === 0) {
            console.warn('El carrito está vacío');
            return;
        }

        const idsProductos = carrito.map(item => item.id);
        const productosData = await getProductosAPedir();
        console.log('Productos obtenidos:', productosData);

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

        console.log('Datos del pedido:', JSON.stringify(pedido));

        const response = await fetchWithAuth('http://127.0.0.1:5000/api/usuarios/pedidos', {
            method: 'POST',
            body: JSON.stringify(pedido)
        });

        if (response) {
            console.log("Pedido creado con éxito:", response);
            
            // Actualiza el historial de pedidos con los datos actuales del pedido
            actualizarHistorialPedido(pedidoProductosDto);

            // Limpia el carrito
            cart.set([]); // O usa cart.clear() si tienes esa función en el store

            return response.id_pedido;
        } else {
            throw new Error('Error al crear el pedido: respuesta no válida');
        }
        
    } catch (error) {
        console.error('Error al crear el pedido:', error.message || error);
        throw error;
    }
}
