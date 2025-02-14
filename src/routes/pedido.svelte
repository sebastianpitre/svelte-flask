<script>
    import { createPedido } from '../api/pedido';
    import { getProductos } from '../api/productos';
    import Footer from '../components/Footer.svelte';
    import { vaciarCarrito } from '../stores/cart';
    import { fetchUserProfile } from '../api/user.js';
    import { user } from '../stores/user.js'; // Store para guardar los datos del usuario
    import Swal from 'sweetalert2';
    import { cart } from '../stores/cart';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { address } from '../stores/pedido';


    // Variables para almacenar el carrito y los productos completos
    let carrito = [];
    let productosEnCarrito = [];

    // Variable para almacenar el total de productos y el total a pagar
    let totalProductos = 0;
    let totalAPagar = 0;

    let errorMessage = ''; // Para manejar errores
    let userProfile = {};

    // onMount se ejecuta cuando el componente se monta
    onMount(async () => {
        // Obtener el carrito desde la tienda de Svelte
        carrito = get(cart);
        
        // Extraer los IDs de los productos en el carrito
        const idsProductos = carrito.map(item => item.id);

        // Obtener todos los productos y filtrar solo los que están en el carrito
        const productosData = await getProductos();
        productosEnCarrito = productosData.filter(producto => idsProductos.includes(producto.id));

        // Calcular el total de productos y el total a pagar
        totalProductos = carrito.length; // Cantidad total de productos en el carrito

        // Calcular el total a pagar sumando los precios multiplicados por las cantidades
        totalAPagar = carrito.reduce((total, item) => {
            const producto = productosEnCarrito.find(p => p.id === item.id);

            // Definir precio_final en base a la condición
            const precio_final = producto.is_promocion 
            ? producto.precio - producto.precio * producto.descuento / 100 
            : producto.precio;

            return total + (precio_final * item.quantity);
        }, 0);

        try {
            userProfile = await fetchUserProfile();
            user.set(userProfile); // Guardar los datos en el store
            address.set(userProfile.direccion); // Solo inicializamos el store con la dirección del perfil
        } catch (error) {
            console.error('No se pudo obtener el perfil del usuario:', error);
        }

        // INICIO DE PROTECCION DE RUTA🛡️
        // REQUISITOS let userProfile = {}; E IMPORTAR {fetchUserProfile}
        // Verifica que userProfile esté definido antes de acceder a sus propiedades
        if (userProfile && userProfile.nombres) {
            if (userProfile.rol === "ADMIN" || userProfile.rol === "CLIENTE" || userProfile.rol === "MOD") {
                console.log("Acceso concedido a pedido"); // si es usuario no redirige 
            } else {
                console.log("Redirigiendo a la ruta principal");
                window.location.href = '/'; // no es usuario redirige a home
            }
        } else {
            console.log("Perfil de usuario no disponible");
            window.location.href = '/'; // Redirigir si no hay perfil
        }
        // FIN DE PROTECCION DE RUTA🛡️
        
    });
    // Función que se ejecutará al hacer clic en el botón para crear el pedido
    function handleCrearPedido() {
        createPedido()
            .then((id_pedido) => {
                if (id_pedido) {
                    // Mostrar SweetAlert de éxito
                    Swal.fire({ 
                        title: '¡Éxito!',
                        text: 'Pedido creado con éxito',
                        icon: 'success',
                        showConfirmButton: false,
                            timer: 1500,
                        }).then(() => {
                            window.location.href =`/soporte/${id_pedido}`;
                        });
                    vaciarCarrito();
                }else{
                    // Mostrar SweetAlert de éxito
                    Swal.fire({ 
                        title: '¡ERROR!',
                        text: 'Error al crear el pedido',
                        icon: 'error',
                        confirmButtonText: 'ok',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Redirigir a "mis_pedidos"
                            window.location.href =`/`;
                        }
                    });
                }
                
            })
            .catch(error => {
                console.error('Error al crear el pedido:', error);
                // Mostrar SweetAlert de error
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al crear el pedido',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            });
    }

    let isDisabled = true;
    let finalizarPedido = false;

    function enableEditing() {
        isDisabled = false;
        finalizarPedido = true;
    }

    function cancelEditing() {
        isDisabled = true;
        finalizarPedido = false;
        address.set(userProfile.direccion); //  el store con la dirección del perfil

    }

    function saveChanges() {
        // Aquí puedes agregar la lógica para guardar los cambios
        
        address.set($address); // Actualiza el store con la dirección actual

        isDisabled = true; // Deshabilita nuevamente los inputs después de guardar
        finalizarPedido = false;

        // Mostrar SweetAlert de error
        Swal.fire({
            title: 'Dirección guardada',
            text: 'Cambios guardados con éxito',
            icon: 'success',
            timer: 1500,
            confirmButtonText: 'Aceptar',
        });
                
    }

    
</script>

<main>
    <header class="bg-gradient-success">
        <div class="page-header min-vh-25" >
            <span class="mask bg-gradient-dark opacity-5"></span>
        </div>
    </header>

    <div class="container">
        <div class="row">
            <div class="col-12 col-xl-6 mx-auto">
                <div class="card px-0 px-md-4 mt-n5">
                    <h5 class="ps-3 pt-2">Resumen del Pedido</h5>
                    <div class=" border mb-3">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder ps-3 pe-0">CANT</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder">DESCRIPCIÓN</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-end">VR/U</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-end">VR/T</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each productosEnCarrito as producto (producto.id)}
                                    <tr>
                                        <td class="text-xs font-weight-bolder border-0 ps-4">{carrito.find(item => item.id === producto.id).quantity}</td>
                                        <td class="text-xs font-weight-bolder border-0">{producto.nombre.length >= 15 ? producto.nombre.substring(0, 15) + "..." : producto.nombre} x {producto.cantidad} {producto.unidad_producto}</td>
                                        <td class="text-xs font-weight-bolder border-0 text-end pe-4">$ {producto.is_promocion ? producto.precio-producto.precio*producto.descuento/100 : producto.precio}</td>
                                        <td class="text-xs font-weight-bolder border-0 text-end pe-4">$ {producto.is_promocion ? (producto.precio-producto.precio*producto.descuento/100) * carrito.find(item => item.id === producto.id).quantity : producto.precio * carrito.find(item => item.id === producto.id).quantity}</td>
                                    </tr>
                                {/each}
                                <tr class="border-top">
                                    <td colspan="2" class="text-xxs font-weight-bolder ps-3">N° PRODUCTOS:</td>
                                    <td colspan="2" class="text-xs font-weight-bolder text-end pe-4">{totalProductos}</td>
                                </tr>
                                <tr class="border-top">
                                    <td colspan="2" class="text-xxs font-weight-bolder ps-3">TOTAL A PAGAR:</td>
                                    <td colspan="2" class="text-xs font-weight-bolder text-end pe-4">${totalAPagar.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    
                    
                </div>   
            </div>
    
            <div class="col-12 col-xl-6 mx-auto">
                <div class="card px-0 px-md-4 mt-3 mt-xl-n5">
                    <h5 class="ps-3 pt-2 mb-0">Información de envio</h5>
    
                    <div class="row ps-2">
                        {#if !isDisabled}
                            <div class="col-8 col-md-6">
                                <div class="input-group input-group-static my-2">
                                    <input type="text" placeholder="escriba su dirección" class="form-control mt-n3 pb-0" bind:value={$address} disabled={isDisabled}/>
                                </div>
                            </div>
                        {/if}
    
                        <div class="col-4 col-md-6 my-auto">
                            {#if !isDisabled}
                                <button type="button" class="btn btn-sm bg-danger text-white mb-0" on:click={cancelEditing}>x</button>
                                <button type="button" class="btn btn-sm bg-info text-white mb-0" on:click={saveChanges}>✓</button>
                                
                              {:else}
                                <button type="button" class="btn btn-sm btn-warning mb-0" on:click={enableEditing}>Editar</button>
                            {/if}
                        </div>
                    </div>
    
                    <div class="border mt-2 p-2 mb-3">
                        <p class="text-xs text-secondary mb-1"><strong>Nombre del destinatario:</strong>  {userProfile.nombres} {userProfile.apellidos}</p>
                        <p class="text-xs text-secondary mb-1"><strong>Dirección de entrega:</strong> {$address}</p>
                        <p class="text-xs text-secondary mb-1"><strong>Ciudad:</strong> {userProfile.ciudad}</p>
                        <p class="text-xs text-secondary mb-1"><strong>Teléfono:</strong>  {userProfile.telefono}</p>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="col text-center">
            <a href="/" class="btn btn-sm btn-danger mb-0">Volver</a>

            <button class="mt-3 btn btn-sm btn-success" on:click={handleCrearPedido} disabled={finalizarPedido}>
                Finalizar y enviar Pedido
            </button>

            {#if !isDisabled}
                <p style="color: #ff000094; font-size: 14px;">Debes confirmar la dirección para continuar</p>
            {/if}
        </div>
    </div>
    
</main>