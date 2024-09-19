<script>
	import Menufooter from '../components/menufooter.svelte';
    import { isAuthenticated, checkAuth } from '../stores/auth';
	import Footer from '../components/footer.svelte';
	import Nav from '../components/nav.svelte';
    
    import { onMount } from 'svelte';

    import { getPedidos } from '../api/pedidoAdmin';
    import MenuAcciones from '../components/MenuAcciones.svelte';

    let pedidos = [];
    let errorMessage = '';

    onMount(async () => {
        try {
            pedidos = await getPedidos();
        } catch (error) {
            errorMessage = 'No se pudieron cargar los pedidos.';
        }
    });

    // redirigir si no iniciado sesion

    let isAuth = false;
    onMount(async () => {
        isAuth = await checkAuth();
        if (!isAuth) {
            window.location.href = '/login'; // Redirige al login si no está autenticado
        }
    });

    // modal carrito
    import { isModalOpenPedidos } from '../stores/modalStore.js';
    import ModalPedidos from '../components/ModalPedidos.svelte';


    export let id; // Recibe el ID del componente que lo llama
    function openModal(id) {

    isModalOpenPedidos.set(true);
    }

</script>



<main>
    <Nav/>

    <ModalPedidos {id}/>

    <MenuAcciones/>
    <div class="container-fluid">
        <div class="row">

            <div class="col-12 col-md-10 mx-auto mb-4 mb-md-0">
                
                <!-- <div class="col-12 text-end">
                    <button on:click={() => openModal()} class="btn btn-sm btn-success">Agregar producto</button>
                </div> -->
                <div class="card p-2">
                    <div class="table-responsive">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">Id del pedido</th>
                                    <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">Monto total</th>
                                    <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">estado del pedido</th>
                                    <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">fecha de creacion</th>
                                    <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">Id del usuario</th>
                                    <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#if errorMessage}
                                <tr><td><p>{errorMessage}</p></td></tr>
                                {/if}
                                {#if pedidos.length === 0}
                                <tr><td><p>No hay pedidos disponibles.</p></td></tr>
                                {/if}

                                {#each pedidos as values}
                                <tr>
                                    <td>
                                        <p class="text-sm mb-0 text-center">
                                            <span class=" font-weight-bold"> {values.id_pedido}  </span>
                                        </p>
                                    </td>
        
                                    <td>
                                        <p class="text-sm mb-0 text-center">
                                            <span class=" font-weight-bold"> {values.monto_total}  </span>
                                        </p>
                                    </td>

                                    <td>
                                        <p class="text-sm mb-0 text-center">
                                            {#if values.estado_pedido === "PENDIENTE"}
                                            <span class="text-info font-weight-bold"> {values.estado_pedido}  </span>
                                                {:else if values.estado_pedido === "APROBADO"}
                                                <span class="text-success font-weight-bold"> {values.estado_pedido}  </span>
                                                {:else if values.estado_pedido === "CANCELADO"}
                                                <span class="text-danger font-weight-bold"> {values.estado_pedido} ❌  </span>
                                                {:else if values.estado_pedido === "ENTREGADO"}
                                                <span class="text-success font-weight-bold"> {values.estado_pedido}✅  </span>
                                            {/if}
                                        </p>
                                    </td>
        
                                    <td>
                                        <p class="text-sm mb-0 text-center">
                                            <span class=" font-weight-bold"> {values.fecha_creacion}  </span>
                                        </p>
                                    </td>

                                    <td>
                                        <p class="text-sm mb-0 text-center">
                                            <span class=" font-weight-bold"> 1  </span>
                                        </p>
                                    </td>

                                    <td class="text-center">
                                        <button on:click={() => openModal(values.id_pedido)} class="btn btn-sm text-white bg-info">Detalles</button>
                                        <button class="btn btn-sm btn-success">✓</button>
                                        <button class="btn btn-sm btn-danger">x</button>
                                    </td>
                                </tr>
                                {/each}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <Menufooter/>

    <Footer/>
</main>