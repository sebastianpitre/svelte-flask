import { fetchWithAuth } from './auth'; // Verifica que la ruta sea correcta
import Swal from "sweetalert2";

// FETCH pedidos 🚩...

let listpedidos = [];
export async function getPedidos() {
    try {
        const pedidos = await fetchWithAuth('http://127.0.0.1:5000/api/usuarios/pedidos');
        return pedidos;
    } catch (error) {
        console.error('Error fetching pedidos:', error);
        throw error;
    }
}


// DELETE pedidos 🚩...




// POST pedidos 🚩...

