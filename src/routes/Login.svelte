<script>
    import { login } from '../api/auth';
    let email = '';
    let password = '';
    let errorMessage = '';

    async function handleLogin() {
        try {
            await login({ email, password });
            window.location.href = '/'; // Redirige al inicio después del login
        } catch (error) {
            errorMessage = 'Usuario o contraseña incorrectos.';
        }
    }
</script>

<style>
    .errorMessage{
        color: red;
    }
</style>

<section class="bg-white">

    <div class="page-header min-vh-100">
        <div class="container">
            <div class="row">
                
                <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column me-auto me-auto me-lg-auto ms-lg-5 z-index-2">
                    <div class="card card-plain">
                        <div class="card-header text-center">
                            <h4 class="font-weight-bolder">Iniciar sesión</h4>
                            <p class="mb-0">Ingresa tu correo electrónico y contraseña para iniciar sesión</p>
                        </div>
                        <div class="card-body mt-n4">
                            <form on:submit|preventDefault={handleLogin}>
                                <label for="email" class="form-label">Correo</label>
                                <div class="input-group input-group-outline mb-2 mt-n2">
                                    <input type="text" id="email" class="form-control" bind:value={email} required>
                                </div>
                                <label for="password" class="form-label">Contraseña</label>
                                <div class="input-group input-group-outline mb-3 mt-n2">
                                    <input type="password" id="password" class="form-control" bind:value={password} required>
                                </div>
                                {#if errorMessage}
                                    <p class="errorMessage text-center">{errorMessage}</p>
                                {/if}
                                <div class="text-center">
                                    <button class="btn btn-success col-10" type="submit">iniciar sesión</button>    
                                </div>

                                
                            </form>
                        </div>
                        <div class="card-footer text-center pt-0 px-lg-2 px-1">
                            <p class="mb-2 text-sm mx-auto">
                                No tienes una cuenta?
                                <a href="registro" class="text-success text-gradient font-weight-bold">Crear cuenta</a>
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
