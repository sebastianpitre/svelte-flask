<script>
    import { onMount } from "svelte";
    import Swal from "sweetalert2";
    import { fetchWithAuth } from '../api/auth.js'; // Asegúrate de importar la función correctamente
    
    export let id;

    // DATOS
    let nombre = '';
    let url_imagen = '';
    let is_activo= false;

    onMount(async () => {
      try {

        // Si hay un id, obtener detalles del producto (ya como JSON)
        if (id) {
          const producto = await fetchWithAuth(`https://vitribackendflask.onrender.com/api/admin/categorias/${id}`);
          if (producto) {

            nombre = producto.nombre;
            url_imagen = producto.url_imagen;
            is_activo= producto.is_activo;
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  
    const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      nombre,
      url_imagen,
      is_activo,
    };

    try {
      const method = id ? "PATCH" : "POST";
      const url = id
        ? `https://vitribackendflask.onrender.com/api/admin/categorias/${id}`
        : "https://vitribackendflask.onrender.com/api/admin/categorias";

      // Usar fetchWithAuth en lugar de fetch
      const data = await fetchWithAuth(url, {
        method,
        headers: {
    "Content-Type": "application/json"
  },
        body: JSON.stringify(formData),
      });

      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Categoria guardada correctamente',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = '/categorias'; // Redirigir a la lista de categorias
      });

    } catch (error) {
      // Mostrar mensaje de error en caso de fallo
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar el producto',
      });
    }
  };
  </script>
  
  <main class="row col-12 bg-gray-200" style="min-height: 100vh; background-image: url('');">
    <div class="col-12 col-md-6 mx-auto pt-3 mb-4 mb-md-0">
        <form on:submit={handleSubmit}>
          <div class="card p-3">
            <h3 class="text-center">{id ? "Editar categoria" : "Guardar categoria"}</h3>
            <div class="row mx-auto pt-3">
              
  
              <div class="col-12 col-md-6">
                <div class="input-group  input-group-static my-2">
                    <h6 class="">Nombre de la categoria</h6>
                    <input type="text" class="form-control mt-n3" bind:value={nombre} />
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="input-group  input-group-static my-2">
                    <h6 class="">Link Icono</h6>
                    <input type="text" class="form-control mt-n3" bind:value={url_imagen} />
                </div>
            </div>

  
              <div class="col-12 text-center">
                <a href="/categorias" class="btn btn-danger">Cancelar</a>
                <button class="btn btn-success" type="submit">Guardar</button>
              </div>
            </div>
          </div>
        </form>
    </div>
  </main>
  
  <style>
    main {
      background-color: #eee;
    }
  
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 24px;
      margin: 10px;
    }
  
    .toggle-switch .toggle-input {
      display: none;
    }
  
    .toggle-switch .toggle-label {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 24px;
      background-color: #000;
      border-radius: 34px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    .toggle-switch .toggle-label::before {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      background-color: #fff;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s;
    }
  
    .toggle-switch .toggle-input:checked + .toggle-label {
      background-color: #4CAF50;
    }
  
    .toggle-switch .toggle-input:checked + .toggle-label::before {
      transform: translateX(16px);
    }
  </style>
  