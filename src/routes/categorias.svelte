<script>
    import { onMount } from 'svelte';

    import Swal from 'sweetalert2';
    import Footer from '../components/footer.svelte';
    import Nav from '../components/nav.svelte';
    import MenuAcciones from '../components/MenuAcciones.svelte';

    // Definimos las variables reactivas para el estado del formulario
    let id_categorias;
    let url_imagen = '';
    let nombre = '';
    

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            id_categorias,
            url_imagen,
            nombre,
            
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/api/publico/categorias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            console.log('Datos enviados correctamente:', data);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    let listCategorias = [];

    fetch("http://127.0.0.1:5000/api/publico/categorias")
    .then((response) => response.json())
    .then((results) => (listCategorias = results));

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
            const response = await fetch(`http://127.0.0.1:5000/api/publico/categorias/${id_categorias}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Actualizar la lista de categoria después de la eliminación
                listCategorias = listCategorias.filter(producto => producto.id !== id_categorias);
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

    <div class="row m-0">
        <MenuAcciones/>
        
        <div class="col" style="margin-left: 4.5rem;">

            
            <div class="col-8 mx-auto">
                <div class="row">
                    <h4 class="col-6 pt-3">Categorias</h4>
                    <div class="col-6 mt-3 text-end">
                        <a href="/categoria/nueva" class="btn btn-sm btn-success">Agregar categoria</a>
                    </div>
                </div>

                
                  
                  

                <div class="table-responsive card">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7">
                                    id</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Nombres</th>
                                
                                <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7">
                                    acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each listCategorias as values}
                            <tr>
                                <td>
                                    <p class="mb-0 text-xs text-center">{values.id_categorias}</p>
                                </td>
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <img src="{values.url_imagen}" alt="img" class=" avatar-xs me-3">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-xs">{values.nombre}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle text-center">
                                    <a class="btn btn-sm btn-outline-success" href={`/categoria/editar/${values.id_categorias}`}>Editar</a>
                                    <button class="btn btn-sm btn-outline-danger" on:click={() => eliminarCategoria(values.id_categorias)}>Eliminar</button>
                                    
                                </td>
                            </tr>
                            {:else}
                            <tr>
                                <td class="text-center">
                                    No se encontraron categorias  
                                </td>
                            </tr>
                            {/each}
                            
                        </tbody>
                    </table>
                </div>

                
            </div>

        </div>
    </div>
    <Footer/>
</main>
