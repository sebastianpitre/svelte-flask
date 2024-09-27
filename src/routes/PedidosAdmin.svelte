<script>
    import Footer from '../components/Footer.svelte';
    import { onMount } from 'svelte';
    import { getPedidosAdmin } from '../api/pedidoAdmin';
    import MenuAcciones from '../components/MenuLateral.svelte';
    
    // Importamos las librerías de DataTables
    import jQuery from 'jquery';
    import 'datatables.net-dt';

    let pedidos = [];
    let errorMessage = '';

    // Cargar los pedidos
    onMount(async () => {
        try {
            pedidos = await getPedidosAdmin();
        } catch (error) {
            errorMessage = 'No se pudieron cargar los pedidos.';
        }
    });

    // modal carrito
    import ModalPedidos from '../components/ModalPedidos.svelte';
    import { idStore, isModalOpenPedidos } from '../stores/modalStore';

    function openModal(id) {
        idStore.set(id); // Asigna el ID al store
        isModalOpenPedidos.set(true); // Abre el modal
    }

    // Inicializar DataTable después de cargar los pedidos
    onMount(() => {
        const tableInterval = setInterval(() => {
            if (pedidos.length > 0) {
                jQuery('#tablaPedidos').DataTable({
                    language: {
                        search: "Buscar:",
                        lengthMenu: "Mostrar _MENU_ entradas",
                        info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
                        infoEmpty: "No hay entradas disponibles",
                        infoFiltered: "(filtrado de _MAX_ entradas totales)",
                        paginate: {
                            first: "Primero",
                            last: "Último",
                            next: "Siguiente",
                            previous: "Anterior"
                        },
                        zeroRecords: "No se encontraron registros coincidentes" // Traducción aquí
                    }
                }); // Inicializa DataTable
                clearInterval(tableInterval);
            }
        }, 300); // Revisa cada 300ms hasta que los pedidos se hayan cargado
    });
</script>

<main>

    <ModalPedidos/>

        <div class="row m-0" style="padding-left: 4.5rem;">

            <MenuAcciones/>

            <div class="col">
                <div class="col-12">
                    <h4 class="col-6 pt-3">Pedidos</h4>
                    <div class="card mt-3 p-2">
                        <div id="productTable" class="table-responsive">
                            <table id="tablaPedidos" class="table display align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">Id del pedido</th>
                                        <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">Monto total</th>
                                        <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">Estado del pedido</th>
                                        <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">Fecha de creación</th>
                                        <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">Id del usuario</th>
                                        <th class="text-uppercase text-secondary text-center text-xxs font-weight-bolder opacity-7">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#if errorMessage}
                                    <tr><td colspan="6" class="text-center"><p>{errorMessage}</p></td></tr>
                                    {/if}
                                    {#if pedidos.length === 0}
                                    <tr><td colspan="6" class="text-center"><p>No hay pedidos disponibles.</p></td></tr>
                                    {/if}
    
                                    {#each pedidos as values}
                                    <tr>
                                        <td>
                                            <p class="text-sm mb-0 text-center">
                                                <span class=" font-weight-bold">00{values.id_pedido}  </span>
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
                                                <span class=" font-weight-bold">{values.id_usuario} </span>
                                            </p>
                                        </td>
    
                                        <td class="text-center">
                                            <button on:click={() => openModal(values.id_pedido)} class="btn btn-sm text-white bg-info">Detalles</button>
                                            <button class="btn btn-sm btn-success">✓</button>
                                            <button class="btn btn-sm btn-danger">x</button>
                                            <a class="btn btn-sm btn-outline-success" href={`/pedidos_admin/${values.id_pedido}`}>Editar</a>
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

    <Footer/>
</main>
