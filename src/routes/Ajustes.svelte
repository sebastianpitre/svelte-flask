<script>
    import { onMount } from 'svelte';
    import { fetchWithAuth } from '../api/auth';
    import Swal from 'sweetalert2';
    import { getBanners } from '../api/banner';
    import Footer from '../components/Footer.svelte';
    import MenuAcciones from '../components/MenuLateral.svelte';

    let categorias = [];
    let errorMessage = '';

    onMount(async () => {
        try {
            categorias = await getBanners();
        } catch (error) {
            errorMessage = 'No se pudieron cargar las categorias.';
        }
    });

    // eliminar Categorias

   async function eliminarCategoria(id_categorias) {
    try {
        const result = await Swal.fire({
            
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar'
        });

        if (result.isConfirmed) {
            const response = await fetchWithAuth(`http://127.0.0.1:5000/api/admin/categorias/${id_categorias}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Actualizar la lista de categoria después de la eliminación
                categorias = categorias.filter(categorias =>categorias.id_categorias !== id_categorias);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '¡Eliminado!',
                    text: 'La categoria ha sido eliminada.',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire(
                    'Error',
                    `Hubo un problema al eliminar la categoria: ${response.statusText}`,
                    'error'
                );
            }
        }
    } catch (error) {
        Swal.fire(
            'Error',
            `Hubo un problema al eliminar la categoria: ${error}`,
            'error'
        );
    }
}

</script>

<main>

    <div class="row m-0" style="padding-left: 4.5rem;">
        <MenuAcciones/>
        
        <div class="col" style="min-height: 68vh;">

            
            <div class="col mx-auto">
                <div class="row">
                    <h4 class="col-6 pt-3">Ajustes</h4>
                    <div class="col-6 mt-3 text-end">
                        <a href="/nuevo_banner" class="btn btn-sm btn-success">Agregar banner</a>
                    </div>
                </div>

                
                  <div class="row mx-5">
                    {#each categorias as values}
                    <div class="col-6 col-md-3 mb-3">
                        <div class="card">
                            <img class="card-img-top" src="{values.url_imagen}" alt="img" />
                            <p class="text-center">Posicion de la imagen en "Y" {values.posicion_y}</p>
                            
                            <div class="card-body p-0 text-center">
                                <a class="btn btn-danger btn-sm" href="/#">eliminar</a>
                            </div>
                        </div>
                    </div>
                    {/each}
                  </div>
                  
            </div>

        </div>
    </div>
    <Footer/>
</main>
