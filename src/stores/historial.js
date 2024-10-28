// Archivo historial.js (puedes llamarlo como prefieras)

// Obtiene la fecha actual en formato "YYYY-MM-DD"
function obtenerFechaActual() {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
}

// Inicializa o reinicia el historial si es un nuevo día
function verificarFechaHistorial() {
    const fechaActual = obtenerFechaActual();
    const fechaHistorial = localStorage.getItem('fecha_historial');

    if (fechaHistorial !== fechaActual) {
        // Si es un nuevo día, limpia el historial y actualiza la fecha en localStorage
        localStorage.setItem('historial_pedido', JSON.stringify({}));
        localStorage.setItem('fecha_historial', fechaActual);
        console.log('Historial de pedidos reiniciado para el nuevo día');
    }
}

// Llama a la verificación de fecha inmediatamente al cargar el módulo
verificarFechaHistorial();

// Puedes exportar otras funciones si necesitas llamarlas en otro lugar
export function actualizarHistorialPedido(pedidoProductosDto) {
    let historialPedido = JSON.parse(localStorage.getItem('historial_pedido') || '{}');

    pedidoProductosDto.forEach(item => {
        if (historialPedido[item.id]) {
            historialPedido[item.id] += item.cantidad;
        } else {
            historialPedido[item.id] = item.cantidad;
        }
    });

    localStorage.setItem('historial_pedido', JSON.stringify(historialPedido));
}

export { obtenerFechaActual, verificarFechaHistorial };
