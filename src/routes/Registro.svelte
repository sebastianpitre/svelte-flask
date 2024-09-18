<script>
    import { onMount } from 'svelte';
    import { createPedido } from '../api/auth'; // Cambia esto a la ruta adecuada si es necesario

    let nombres = '';
    let apellidos = '';
    let email = '';
    let password = '';
    let rol = 'CLIENTE';  // Esto puedes cambiarlo según el tipo de registro
    let tipo_identificacion = '';  // Tipo de identificación predeterminado
    let identificacion = '';
    let telefono = '';
    let direccion = '';
    let barrio = '';
    let ciudad = '';
    let is_activo = 1;
    let errorMessage = '';
    let successMessage = '';

    const handleRegister = async () => {
        try {
            const data = {
                id_usuarios: 0,
                nombres,
                apellidos,
                email,
                password,
                rol,
                tipo_identificacion,
                identificacion,
                telefono,
                direccion,
                barrio,
                ciudad,
                is_activo,
                fecha_creacion: new Date().toISOString(),
                fecha_actualizacion: new Date().toISOString()
            };
            await createPedido(data);
            successMessage = 'Registro exitoso';
            errorMessage = '';
        } catch (error) {
            errorMessage = 'Error al registrar usuario';
            successMessage = '';
        }
    };
</script>

<style>
    .errorMessage{
        color: red;
    }
    .successMessage{
        color: #4CAF50;
    }
</style>

<section class="bg-white">

    <div class="page-header min-vh-100">
        <div class="container">
            <div class="row">
                
                <div class="col-xl-5 col-lg-5 col-md-8 d-flex flex-column me-auto me-auto me-lg-auto ms-lg-4">
                    <div class="card card-plain">
                        <div class="card-header text-center">
                            <h4 class="font-weight-bolder">Crear cuenta</h4>
                            <p class="mb-0">Ingresa tu correo electrónico y contraseña para iniciar sesión</p>
                        </div>
                        <div class="card-body mt-n4">
                            
                        <form on:submit|preventDefault={handleRegister}>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <label for="nombres" class="form-label">Nombres</label>
                                    <div class="input-group input-group-outline mb-2 mt-n2">
                                        <input type="text" id="nombres" class="form-control" bind:value={nombres} required>
                                    </div>
                                </div>
    
                                <div class="col-12 col-md-6">
                                    <label for="apellidos" class="form-label">Apellidos</label>
                                    <div class="input-group input-group-outline mb-2 mt-n2">
                                        <input type="text" id="apellidos" class="form-control" bind:value={apellidos} required>
                                    </div>
                                </div>
                                
                                <div class="col-12 col-md-12">
                                    <label for="email" class="form-label">Correo</label>
                                    <div class="input-group input-group-outline mb-2 mt-n2">
                                        <input type="email" id="email" class="form-control" bind:value={email} required>
                                    </div>
                                </div>
    
                                <div class="col-12 col-md-12">
                                    <label for="password" class="form-label">Contraseña</label>
                                    <div class="input-group input-group-outline mb-3 mt-n2">
                                        <input type="password" id="password" class="form-control" bind:value={password} required>
                                    </div>
                                </div>
    
                                <div class="col-5 col-md-4">
                                    <label for="tipo_identificacion" class="form-label">Tipo ident.</label>
                                    <div class="input-group input-group-outline mb-3 mt-n2">
                                        <select id="tipo_identificacion" class="form-control" bind:value={tipo_identificacion} required>
                                            <option value="" disabled selected>Seleccionar</option>
                                            <option value="CC">CC</option>
                                            <option value="TI">TI</option>
                                            <!-- Agrega más opciones según sea necesario -->
                                        </select>
                                    </div>
                                </div>

                                <div class="col-7 col-md-8">
                                    <label for="identificacion" class="form-label">Numero ident.</label>
                                    <div class="input-group input-group-outline mb-2 mt-n2">
                                        <input type="text" id="identificacion" class="form-control" bind:value={identificacion} required>
                                    </div>
                                </div>

                                <div class="col-12 col-md-5">
                                    <label for="telefono" class="form-label">Teléfono</label>
                                    <div class="input-group input-group-outline mb-2 mt-n2">
                                        <input type="text" id="telefono" class="form-control" bind:value={telefono} required>
                                    </div>
                                </div>

                                <div class="col-12 col-md-7">
                                    <label for="direccion" class="form-label">Dirección</label>
                                    <div class="input-group input-group-outline mb-2 mt-n2">
                                        <input type="text" id="direccion" class="form-control" bind:value={direccion} required>
                                    </div>
                                </div>
                                
                                <div class="col-12 col-md-6">
                                    <label for="barrio" class="form-label">Barrio</label>
                                    <div class="input-group input-group-outline mb-2 mt-n2">
                                        <input type="text" id="barrio" class="form-control" bind:value={barrio} required>
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <label for="ciudad" class="form-label">Ciudad</label>
                                    <div class="input-group input-group-outline mb-2 mt-n2">
                                        <input type="text" id="ciudad" class="form-control" bind:value={ciudad} required>
                                    </div>
                                </div>
    
                                {#if errorMessage}
                                    <p class="errorMessage text-center">{errorMessage}</p>
                                {/if}
    
                                {#if successMessage}
                                    <p class="successMessage text-center">{successMessage}</p>
                                {/if}
    
                                <div class="text-center mt-3">
                                    <button class="btn btn-success col-10" type="submit">Registrar</button>
                                </div>
                            </div>
                        </form>
                        </div>
                        <div class="card-footer text-center pt-0 mt-n3 px-lg-2 px-1">
                            <p class="mb-2 text-sm mx-auto">
                                Ya tienes una cuenta?
                                <a href="/login" class="text-success text-gradient font-weight-bold">Iniciar sesión</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                    <div class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                        style="background-image: url('../public/img/img-sena/arbol.jpeg'); background-size: cover;">
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>
