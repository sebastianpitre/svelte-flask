<script>
    import { onMount } from "svelte";
    import { currentPath, updatePath } from '../stores/menu.js';
    import { isModalOpen } from '../stores/modalStore.js';
    import { totalProducts, productCount, addToCart } from '../stores/cart.js';
    
    import { Router, Route, link } from 'svelte-routing';
    import { fetchUserProfile } from '../api/user';
    import { user } from '../stores/user'; // Store para guardar los datos del usuario

    let userProfile = {};

    // Llamar a la función al montar el componente
    onMount(async () => {
        try {
            userProfile = await fetchUserProfile();
            user.set(userProfile); // Guardar los datos en el store
        } catch (error) {
            console.error('No se pudo obtener el perfil del usuario:', error);
        }
    });

    function openModal() {
        isModalOpen.set(true);
    }

    function handleAddProduct() {
        addToCart({ id: 1, name: 'Producto Ejemplo', price: 100 });
    }

    function isActive(path) {
        return $currentPath === path ? 'bg-select border-sebas border col-10 mx-auto' : 'col-8 mx-auto';
    }
</script>


    <div class="position-sticky bottom-1 d-md-none mb-n2" style="z-index: 999;">
        <div class="container-fluid">
            <div class="row mx-sebas" style="border-radius: 0.60rem; background-color: black;">

                <a class="col p-1 text-center" href="/" on:click={() => updatePath('/')}>
                    <div class="{isActive('/')}">
                        <span class="material-symbols-outlined text-white" style="border-radius: 50%; font-size: 28px;">home</span>
                        <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Inicio</p>
                    </div>
                    
                </a>
                {#if userProfile && userProfile.nombres}

                    <!-- ADMIN -->
                    {#if userProfile.rol === "ADMIN"}
                        <a class="col p-1 text-center" href="/cuenta" on:click={() => updatePath('/cuenta')}>
                            <div class="{isActive('/cuenta')}">
                                <span class="material-symbols-outlined text-white " style="border-radius: 50%; font-size: 28px;">person</span>
                                <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Cuenta</p>
                            </div>
                        </a>

                        <a class="col p-1 text-center" href="/productos" on:click={() => updatePath('/productos')}>
                            <div class="{isActive('/productos')}">
                                <span class="material-symbols-outlined text-white " style="border-radius: 50%; font-size: 28px;">manufacturing</span>
                                <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Admin</p>
                            </div>
                            
                        </a>

                        <!-- USUARIO -->
                        {:else if userProfile.rol === "CLIENTE"}
                        <a class="col p-1 text-center" href="/cuenta" on:click={() => updatePath('/cuenta')}>
                            <div class="{isActive('/cuenta')}">
                                <span class="material-symbols-outlined text-white " style="border-radius: 50%; font-size: 28px;">person</span>
                                <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Cuenta</p>
                            </div>
                        </a>
                    {/if}
                {:else}

                <a class="col p-1 text-center" href="/login" on:click={() => updatePath('/cuenta')}>
                    <div class="{isActive('/cuenta')}">
                        <span class="material-symbols-outlined text-white " style="border-radius: 50%; font-size: 28px;">person</span>
                        <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Cuenta</p>
                    </div>
                </a>

                <!-- carrito -->

                
                {/if}

                
                <button class="col btn text-capitalize mb-0 position-relative p-1 text-center" on:click={openModal}>
                    <svg class="mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105.96 98.45" style="width: 30px;">
                        <defs>
                          <style>
                            .cls-1 {font-family: MSReferenceSansSerif, 'MS Reference Sans Serif';font-size: 33px;}
                      
                            .cls-2 {fill: #38a900a8;}
                      
                            #cls-3 {fill: #fff;stroke: #38a900a8;stroke-miterlimit: 10;stroke-width: 4px;text-align:center;}
                      
                            .cls-4 {fill: #38a900a8;}
                          </style>
                        </defs>
                        <g>
                          <path class="cls-4" d="M59.28,34.41c6.49,0,12.98-.04,19.47.01,6.25.05,7.49,1.57,6.12,7.45-1.66,7.11-3.29,14.23-5.09,21.31-2.15,8.49-7.02,12.28-15.62,12.32-9.82.04-19.65-.3-29.45.1-10.13.41-14.97-5.45-16.78-13.56-1.95-8.75-4.18-17.44-5.84-26.25-.66-3.49-1.78-5.03-5.44-4.49-3.42.51-6.79,0-6.65-4.43.12-3.98,3.38-4.35,6.57-4.37,11.81-.06,11.76-.06,14.21,11.37,1.94,9.09,4.11,18.13,6.02,27.23.89,4.25,3.13,6.24,7.59,6.17,9.82-.15,19.64-.13,29.45,0,4.17.06,6.51-1.61,7.38-5.74,1.03-4.87,2.1-9.76,3.62-14.49,1.22-3.79-.39-4.12-3.47-4.06-9.32.18-18.63.18-27.95.22-2.16.01-4.33.03-6.48-.13-2.88-.22-4.61-1.56-4.42-4.78.19-3.15,2.3-3.82,4.79-3.84,7.32-.07,14.64-.03,21.97-.03v-.02Z"/>
                          <path class="cls-2" d="M62.23,81.58c4.5-.07,8.48,4.01,8.48,8.69,0,4.44-3.7,8.09-8.28,8.18-4.55.09-8.4-3.5-8.5-7.93-.1-4.62,3.84-8.87,8.29-8.94Z"/>
                          <path class="cls-4" d="M32.24,82.37c4.1.13,7.62,4.07,7.53,8.42-.09,4.53-3.86,7.85-8.68,7.63-4.47-.2-7.67-3.73-7.48-8.23.2-4.55,3.96-7.97,8.62-7.82Z"/>
                          {#if $productCount > 0}
                            <circle id="cls-3" cx="78.45" cy="27.51" r="24.51"/>
                            <text class="cls-1" transform="translate(63.32 35.83)"><tspan x="{$productCount < 10 ? "5" : "-6"}" y="5">{$productCount}</tspan></text>
                          {/if}
                        </g>
                      </svg>
                    <p class="m-0 mt-n3 pt-1 text-white" style="font-size: 12px;">Carrito</p>
                </button>
            </div>
        </div>
    </div>

    

<style>
.mx-sebas {
  margin-right: -6px !important;
  margin-left: -6px !important;
}

.border-sebas{
    border-radius: 0.60rem;
}

.bg-select{
    background-color: #38a900a8 ;
}
</style>
