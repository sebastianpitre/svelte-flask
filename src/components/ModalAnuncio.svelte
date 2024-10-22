
<script>
  import { onMount, afterUpdate } from 'svelte';
  import '@splidejs/splide/dist/css/splide.min.css';
  import Splide from '@splidejs/splide';

  let listProductos = [];
  let splide;

  onMount(async () => {
    try {
      // Obtener productos desde API
      const responseProductos = await fetch("http://127.0.0.1:5000/api/publico/productos");
      listProductos = await responseProductos.json();
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  });

  afterUpdate(() => {
    if (listProductos.length > 0 && !splide) {
      // Inicializa Splide sólo después de que los productos estén disponibles
      splide = new Splide('.splide', {
        type   : 'loop',
        perPage: 1,
      }).mount(); // Monta Splide

      // Función para simular el clic en "next" cada 3 segundos
      setInterval(() => {
        splide.go('>'); // Avanza al siguiente slide
      }, 10000); // Cambiar de slide cada 3 segundos
    }
  });

  import { isModalOpenAnuncios } from "../stores/modalStore.js";

  function handleClickOutside(event) {
    if (event.target.classList.contains("modal")) {
      isModalOpenAnuncios.set(false); // Cierra el modal
    }
  }
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="modal" class:open={$isModalOpenAnuncios} on:click={handleClickOutside} role="dialog" aria-modal="true">

  <style>
    .cls-1 {
      letter-spacing: 0em;
    }

    .cls-2 {
      letter-spacing: 0em;
    }

    .cls-3 {
      font-size: 29px;
    }

    .cls-3, .cls-4, .cls-5 {
      fill: #fff;
    }

    .cls-3, .cls-6 {
      font-family: Raleway-Light, Raleway;
      font-weight: 300;
    }

    .cls-7 {
      letter-spacing: .01em;
    }

    .cls-4 {
      font-family: Raleway-Black, Raleway;
      font-size: 30px;
      font-weight: 800;
    }

    .cls-8 {
      letter-spacing: -.03em;
    }

    .cls-9 {
      fill: #f2e500;
    }

    .cls-10 {
      font-family: MyanmarText-Bold, 'Myanmar Text';
      font-size: 18.3px;
      font-weight: 700;
      letter-spacing: -.07em;
    }

    .cls-10, .cls-11 {
      fill: #1d1d1b;
    }

    .cls-6 {
      font-size: 14px;
      text-align: center;
    }

    .cls-12 {
      letter-spacing: 0em;
      fill: #fff;
    }

    .cls-13 {
      letter-spacing: -.03em;
    }

    .cls-14 {
      fill: #21211f;
      opacity: .64;
    }

    .cls-11 {
      font-family: MyriadPro-Regular, 'Myriad Pro';
      font-size: 4.67px;
    }

    .cls-15 {
      letter-spacing: 0em;
    }

    .cls-16 {
      letter-spacing: 0em;
    }

    .cls-17 {
      fill: none;
      stroke: #fff;
      stroke-miterlimit: 10;
      stroke-width: 1.92px;
    }

    .cls-18 {
      fill: #ffec00;
    }

    .cls-19 {
      clip-path: url(#clippathAnuncio);
    }
  </style>

  <div class="modal-content">
    <div class="col">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <span class="close position-absolute text-center" on:click={() => isModalOpenAnuncios.set(false)}>&times;</span>
    </div>
    <div class="splide ">
      <div class="splide__track">
        <ul class="splide__list">
          {#each listProductos as values}
          {#if values.is_activo === true && values.is_promocion === true}
              <li class="splide__slide">
                <svg id="Capa_anuncio" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.12 429.04">
                  <defs>
                    
                    <clipPath id="clippathAnuncio">
                      <polygon points="69.16 57.45 34.24 350.52 420.38 311.42 372.2 94.87 69.16 57.45"/>
                    </clipPath>
                  </defs>
                  <g>
                    <g>
                      <polygon points="69.16 57.45 34.24 350.52 420.38 311.42 372.2 94.87 69.16 57.45"/>
                      <g class="cls-19">
                        <image width="2048" height="1536" transform="translate(-10.14 22.79) scale(.23)" xlink:href="{values.url_imagen}"/>
                      </g>
                    </g>
                    <polygon class="cls-14" points="69.87 57.54 69.16 57.45 34.24 350.52 420.38 311.42 403.2 234.23 141.2 150.07 69.87 57.54"/>
                    <polygon class="cls-17" points="78.92 66.49 46.16 341.49 408.46 305.54 363.28 101.59 78.92 66.49"/>
                    <text class="cls-4" transform="translate(92.72 229.71)"><tspan class="cls-12" x="130" y="0" text-anchor="middle" dominant-baseline="middle">{values.nombre}</tspan></text>
                    <text class="cls-3" transform="translate(178.9 262.65)"><tspan x="0" y="6">$ 3000</tspan></text>
                    <g>
                      <polygon class="cls-5 text-center" points="348.64 299.53 109.12 299.53 103.25 276.6 342.76 276.6 348.64 299.53"/>
                      <text class="cls-6" transform="translate(120.63 292.23)"><tspan x="106" y="-3" text-anchor="middle" dominant-baseline="middle">Disponible desde el 23 de octubre</tspan></text>
                    </g>
                    <g>
                      <polygon class="cls-5" points="296.84 73.81 372.14 82.96 385.69 57.11 296.84 73.81"/>
                      <polygon class="cls-5" points="383.02 95.19 409.07 170.01 414.42 88.51 383.02 95.19"/>
                      <polygon class="cls-5" points="71.71 47.09 124.49 16.36 130.5 55.11 71.71 47.09"/>
                      <polygon class="cls-5" points="302.85 67.13 338.26 55.77 318.89 39.07 302.85 67.13"/>
                      <polygon class="cls-5" points="34.97 358.4 137.85 349.71 83.74 384.45 34.97 358.4"/>
                      <polygon class="cls-5" points="417.84 134.55 411.95 182.71 431.11 151.26 417.84 134.55"/>
                      <polygon class="cls-5" points="128.18 0 139.81 55.12 193.92 60.18 128.18 0"/>
                      <polygon class="cls-5" points="66.49 42.48 88.23 29.83 68.51 21.74 66.49 42.48"/>
                      <polygon class="cls-5" points="64.46 57.14 33.62 38.43 54.86 126.42 64.46 57.14"/>
                      <polygon class="cls-5" points="411.95 30.09 385.69 82.96 433.35 60.18 411.95 30.09"/>
                      <polygon class="cls-5" points="31.64 361.11 66.83 384.45 8.43 392.56 31.64 361.11"/>
                      <polygon class="cls-5" points="32.39 332.66 29.77 353.62 10.3 341.49 32.39 332.66"/>
                      <polygon class="cls-5" points="271.91 334.94 421.53 318.28 389.64 367.08 271.91 334.94"/>
                      <polygon class="cls-5" points="420.83 277.92 425.98 311.89 445.09 324.33 420.83 277.92"/>
                      <polygon class="cls-5" points="90.48 388.5 112.38 377.38 106.12 404.84 90.48 388.5"/>
                      <polygon class="cls-5" points="426.25 323.15 411.17 349.25 448.15 333.93 426.25 323.15"/>
                      <polygon class="cls-5" points="31.98 28.02 60.26 45.5 51.68 17.21 31.98 28.02"/>
                      <polygon class="cls-5" points="368.1 48.29 393.81 45.66 405.35 24.68 368.1 48.29"/>
                      <polygon class="cls-5" points="423.58 381.25 425.23 391.69 434.57 384 423.58 381.25"/>
                      <polygon class="cls-5" points="194.48 375.2 192.29 385.09 204.37 377.4 194.48 375.2"/>
                      <polygon class="cls-5" points="19.23 106.55 17.03 124.13 30.77 124.68 19.23 106.55"/>
                      <polygon class="cls-5" points="278.54 11.51 280.74 36.78 294.47 18.65 278.54 11.51"/>
                      <polygon class="cls-5" points="195.58 3.27 197.23 13.16 205.47 1.62 195.58 3.27"/>
                      <polygon class="cls-5" points="447.75 198.85 441.71 209.29 451.05 214.23 447.75 198.85"/>
                      <polygon class="cls-5" points="0 319.72 5.49 327.41 11.54 317.52 0 319.72"/>
                      <polygon class="cls-5" points="204.18 384.95 223.77 371.89 225.81 386.59 204.18 384.95"/>
                      <polygon class="cls-5" points="345.42 414.34 342.56 429.04 353.58 422.51 345.42 414.34"/>
                      <polygon class="cls-5" points="285 5.33 290.72 7.37 294.8 1.66 285 5.33"/>
                      <polygon class="cls-5" points="4.98 128.2 25.8 129.42 19.27 146.57 4.98 128.2"/>
                      <polygon class="cls-5" points="441.12 212.21 460.12 230.25 444.92 227.88 441.12 212.21"/>
                    </g>
                    <g>
                      <g>
                        <path class="cls-9" d="M144.55,147.4c.09,2.39-.71,3.83-2.3,4.8-1.73,1.06-3.5,1.01-5.22-.05-5.45-3.36-10.91-6.69-16.31-10.12-1.24-.79-2.14-.82-3.39-.02-5.12,3.28-10.34,6.41-15.48,9.66-2.1,1.33-4.17,1.88-6.36.34-1.9-1.34-2.42-3.27-1.72-6.12,1.47-5.97,2.89-11.94,4.44-17.89.36-1.37.04-2.17-1.04-3.05-4.75-3.91-9.39-7.94-14.12-11.88-1.86-1.55-2.97-3.36-2.19-5.81.74-2.31,2.48-3.29,4.88-3.55,6.25-.69,12.51-1.04,18.78-1.34,1.42-.07,2.1-.56,2.62-1.87,2.35-5.95,4.77-11.87,7.24-17.77,1.5-3.57,5.7-4.37,8.24-1.68.62.66.96,1.48,1.29,2.3,2.35,5.74,4.73,11.48,7.05,17.24.41,1.01.79,1.66,2.09,1.75,6.46.4,12.9.94,19.35,1.43,2.42.18,4.1,1.37,4.77,3.42.66,2.01.02,3.99-1.86,5.59-4.59,3.9-9.14,7.86-13.84,11.62-1.63,1.31-2,2.45-1.44,4.48,1.54,5.55,2.8,11.18,4.17,16.79.18.74.29,1.49.34,1.74Z"/>
                        <path class="cls-18" d="M95.8,147.63c.62-2.57,1.3-5.4,1.99-8.23.99-4.06,1.91-8.15,3.01-12.18.38-1.39.09-2.21-.99-3.1-5.08-4.21-10.09-8.49-15.12-12.76-.48-.41-.98-.84-1.29-1.37-1.05-1.76.09-3.67,2.33-3.84,6.7-.53,13.41-1.05,20.12-1.48,1.6-.1,2.44-.67,3.05-2.22,2.37-6.08,4.93-12.08,7.38-18.13.54-1.32,1.19-2.44,2.79-2.42,1.5.01,2.15,1.06,2.66,2.32,2.47,6.11,5.04,12.18,7.45,18.31.58,1.47,1.39,2.03,2.92,2.13,6.65.43,13.29.98,19.93,1.44,1.32.09,2.4.45,2.86,1.77.5,1.41-.21,2.42-1.26,3.3-5.15,4.33-10.25,8.7-15.43,12.99-1.01.84-1.33,1.63-1,2.94,1.6,6.26,3.1,12.55,4.64,18.83.08.31.17.61.24.92.3,1.24.29,2.4-.89,3.25-1.17.83-2.26.51-3.36-.17-5.71-3.54-11.45-7.03-17.11-10.65-1.28-.82-2.2-.75-3.43.03-5.68,3.59-11.41,7.09-17.12,10.63-.98.61-1.98.92-3.05.33-.89-.5-1.38-1.29-1.33-2.63Z"/>
                      </g>
                      <text class="cls-10 text-center" transform="translate(102.79 124.75)"><tspan x="0" y="0">{Math.trunc(values.descuento)}%</tspan></text>
                      <text class="cls-11" transform="translate(111.39 130.11)"><tspan x="0" y="0">de dcto.</tspan></text>
                    </g>
                  </g>
                </svg>
              </li>
              {/if}
          {/each}
        </ul>
      </div>
    
      <style>
        .splide__pagination {
          bottom: -1em;
          left: 0;
          padding: 0 1em;
          position: absolute;
          right: 0;
          z-index: 1;
        }
    
        .splide__arrow--prev {
         left: 20px;
        }
        .splide__arrow--next {
          right: 20px;
        }
    
        .mx-n4-5 {
          margin-right: -2.5rem !important;
          margin-left: -2.5rem !important;
        }
      </style>
    </div>
    
    
  </div>
</div>

<style>
svg{
  width: 100%;
  margin: auto
  ;
}

  .modal {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.951);
  }

  .modal.open {
    display: block;
  }

  .modal-content {
    background-color: transparent;
    padding:10px;
    width: 50%;
    margin: auto;
    margin-top: 30px;
    border: none;
  }

  .close {
    border: 3px solid white;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.285);
    color: #ffffff;
    font-size: 28px;
    font-weight: bold;
    width: 50px;
    top: -10px;
    right: -10px;
    z-index: 9999;
  }

  .close:hover,
  .close:focus {
    text-decoration: none;
    cursor: pointer;
  }

  @media (max-width: 1100px) {
    .modal-content {
      width: 70%;
      margin-top: 30px;
    }
  }

  @media (max-width: 770px) {
    .modal-content {
      width: 80%;
      margin-top: 30px;
    }
  }

  @media (max-width: 570px) {
    .modal-content {
      width: 90%;
      margin-top: 20%;
    }
  }

  @media (max-width: 400px) {
    .modal-content {
      width: 100%;
      margin-top: 40%;
    }

    .close {
    
    top: -60px;
    right: 10px;
  }
  }
  
</style>
