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
        padding: '3rem',
        breakpoints: {
          350: { perPage: 1 },
          430: { perPage: 1 },
          700: { perPage: 2 },
          992: { perPage: 2 },
          1200: { perPage: 2 },
          3000: { perPage: 4 }
        }
      }).mount(); // Monta Splide

      // Función para simular el clic en "next" cada 3 segundos
      setInterval(() => {
        splide.go('>'); // Avanza al siguiente slide
      }, 10000); // Cambiar de slide cada 3 segundos
    }
  });
</script>

<style>
  .mx-n4-5 {
    margin-right: -2.5rem !important;
    margin-left: -2.5rem !important;
  }

    .cls-1 {
      letter-spacing: 0em;
    }

    .cls-13 {
        fill: #fff;
      }

    .cls-2 {
      font-family: 'MyanmarText', 'Myanmar Text';
      font-size: 18px;
      text-decoration: line-through;
    }

    .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7 {
      fill: #1d1d1b;
    }

    .cls-8 {
      letter-spacing: .01em;
    }

    .cls-9 {
      letter-spacing: 0em;
    }

    .cls-10 {
      letter-spacing: 0em;
    }

    .cls-11 {
      letter-spacing: -.01em;
    }

    .cls-3 {
      font-size: 16.16px;
    }

    .cls-3, .cls-12 {
      font-family: 'Myanmar Text', 'Myriad Pro';
    }
    .cls-4 {
      font-family: 'MyanmarText-Bold', 'Myanmar Text';
    }

    .cls-12 {
      fill: #fff;
    }

    .cls-12, .cls-4 {
      font-size: 17.01px;
    }

    .cls-13 {
      letter-spacing: 0em;
    }

    .cls-14 {
      fill: white;
    }

    .cls-5 {
      font-size: 40px;
      letter-spacing: .03em;
    }

    .cls-5, .cls-7 {
      font-family: 'MyanmarText-Bold', 'Myanmar Text';
      font-weight: 700;
    }

    @font-face {
    font-family: 'Myanmar Text';
    src: url('../public/fonts/mmrtext.ttf') format('truetype');
    }

    @font-face {
      font-family: 'MyanmarText-Bold';
      src: url('../public/fonts/mmrtextb.ttf') format('truetype');

    }

    .cls-15 {
      letter-spacing: 0em;
    }

    .hola{
      fill: red;

    }

    .cls-16 {
      letter-spacing: 0em;
    }

    .cls-17 {
      letter-spacing: 0em;
    }

    .cls-7 {
      font-size: 78.93px;
      letter-spacing: -.07em;
    }

    .cls-18 {
      fill: #ffec00;
    }

    .cls-19 {
      clip-path: url(#clippath2);
    }
    
</style>

<!-- Estructura HTML del slider con las tarjetas Bootstrap -->
<div class="splide mb-3">
  <div class="splide__track">
    <ul class="splide__list">
      {#each listProductos as values}
        {#if values.is_promocion === true && values.is_activo === true}
          <!-- <li class="splide__slide px-5">
            <div class="card position-relative mb-2 mx-n4-5" style="background-image: url('{values.url_imagen}');background-repeat: no-repeat; background-size: cover;">
              <div class="my-auto py-5">
                <div class="py-0 card mx-auto col-8">
                 <span class="bg-warning col-4 col-sm-3 pt-2 text-white text-center position-absolute" style="z-index: 3; border-radius: 50px; top: -30px; left: -30px; width: 60px; height: 40px;">- 10%</span>

                  <p class="text-dark text-center text-capitalize mt-1 mb-0">{values.nombre.length >= 16 ? values.nombre.substring(0, 16) + "..." : values.nombre}</p>
                  <div class="text-warning text-center mt-1 mb-0">
                    <del class="text-underline text-start text-dark opacity-9" style="font-size: 12px; left: 14px;">$ 5000</del>
                    $4500 <span class="text-dark text-sm">KG</span>
                  </div>
                  
                </div>
              </div>
              <div class="blur opacity-9 col-12 text-dark text-center position-absolute" style="z-index: 3; border-radius: 0px 0px 0.75rem 0.75rem; bottom: 0px; right: 0px; height: 20px; font-size: 15px;">
                <span class="material-symbols-outlined" style="font-size: 15px;">schedule</span>
                2 días 13h
              </div>
            </div>
          </li> -->
          <li class="splide__slide px-5">
            <div class="card position-relative mb-2 mx-n4-5">
              <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 250">
                <defs>
                  
                  <clipPath id="clippath2">
                    <path class="cls-14" d="M400,12.14v225.72c0,6.7-5.43,12.14-12.14,12.14h-176.28c-.09,0-.17-.06-.19-.15L153.05.24c-.03-.12.06-.24.19-.24h234.62c6.7,0,12.14,5.43,12.14,12.14Z"/>
                  </clipPath>
                </defs>
                <rect class="cls-13" y="0" width="318" height="250" rx="12.14" ry="12.14"/>
                <g>
                  <path class="cls-14" d="M400,12.14v225.72c0,6.7-5.43,12.14-12.14,12.14h-176.28c-.09,0-.17-.06-.19-.15L153.05.24c-.03-.12.06-.24.19-.24h234.62c6.7,0,12.14,5.43,12.14,12.14Z"/>
                  <g class="cls-19">
                    <image width="390" height="170" transform="translate(-5) scale(1.45)" xlink:href="{values.url_imagen}"/>
                  </g>
                </g>
                <g>
                  <g>
                    <path class="cls-18" d="{values.descuento.length <= 4 ? "M126.17,87.09c.1,2.67" : "M157.74,87.09c.1,2.67"}-.8,4.28-2.56,5.36-1.93,1.18-3.91,1.13-5.83-.05-6.08-3.75-12.19-7.47-18.22-11.31-1.38-.88-2.39-.92-3.79-.02-5.72,3.66-11.55,7.16-17.29,10.79-2.35,1.49-4.65,2.1-7.1.38-2.12-1.49-2.7-3.65-1.92-6.83,1.64-6.66,3.23-13.34,4.96-19.99.4-1.53.04-2.42-1.16-3.41-5.3-4.37-10.49-8.87-15.77-13.27-2.08-1.73-3.31-3.75-2.44-6.48.82-2.58,2.77-3.67,5.45-3.97,6.98-.77,13.98-1.17,20.98-1.5,1.59-.07,2.35-.63,2.92-2.09,2.63-6.64,5.33-13.26,8.09-19.84,1.67-3.99,6.37-4.89,9.2-1.87.7.74,1.07,1.66,1.44,2.57,2.63,6.42,5.28,12.82,7.88,19.25.45,1.12.88,1.86,2.33,1.95,7.21.45,14.41,1.05,21.62,1.59,2.71.2,4.57,1.53,5.33,3.82.74,2.24.03,4.45-2.08,6.24-5.13,4.35-10.21,8.78-15.46,12.98-1.82,1.46-2.24,2.74-1.61,5,1.72,6.2,3.13,12.49,4.65,18.75.2.82.32,1.66.38,1.94Z"/>
                    <image width="512" height="512" transform="{values.descuento.length <= 4 ? "translate(78.77 38.35) scale(.07)" : "translate(110.34 38.35) scale(.07)"}" xlink:href="../public/illustrator/PNG/porcentaje.png"/>
                  </g>
                  <text class="cls-7" transform="translate(20.83 92.36)"><tspan x="0" y="0">{parseInt(values.descuento, 10)}</tspan></text>
                  <text class="cls-3" transform="translate(28.38 106.74)"><tspan x="0" y="0">de dcto</tspan></text>
                  <text/>
                </g>
                <text class="cls-4" transform="translate(18.57 205.47)">
                  <tspan class="cls-1 " x="0" y="10">{values.nombre.split(' ').slice(0, 3).join(' ')}</tspan>
                </text>
                <text class="cls-2" transform="translate(17.57 140.16)"><tspan x="0" y="0">$ {values.precio}</tspan></text>
                <text class="cls-5" transform="translate(18 175.51)"><tspan x="0" y="5">${values.precio-values.precio*values.descuento/100}</tspan></text>
                <path class="cls-7" d="M207.23,225h192.77s0,12.84,0,12.84c0,6.72-5.44,12.16-12.16,12.16h-207.84s0,0,0,0c0-13.81,12.19-25,27.23-25Z"/>
                <text class="cls-12" transform="translate(200.69 243.47)"><tspan x="0" y="0">Hasta agotar existencias</tspan></text>
              </svg>
            </div>
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
    left: 0px;
  }
  .splide__arrow--next {
    right: 0px;
  }
  </style>
</div>
