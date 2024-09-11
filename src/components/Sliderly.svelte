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
          600: { perPage: 1 },
          700: { perPage: 2 },
          992: { perPage: 2 },
          1200: { perPage: 2 },
          2000: { perPage: 3 }
        }
      }).mount(); // Monta Splide

      // Función para simular el clic en "next" cada 3 segundos
      setInterval(() => {
        splide.go('>'); // Avanza al siguiente slide
      }, 4000); // Cambiar de slide cada 3 segundos
    }
  });
</script>

<style>
  .splide__arrow--prev {
    left: 0px;
  }
  .splide__arrow--next {
    right: 0px;
  }
  .mx-n4-5 {
    margin-right: -2.5rem !important;
    margin-left: -2.5rem !important;
  }

  
</style>

<!-- Estructura HTML del slider con las tarjetas Bootstrap -->
<div class="splide mb-3">
  <div class="splide__track">
    <ul class="splide__list">
      {#each listProductos as values}
        {#if values.is_promocion === true && values.is_activo === true}
          <li class="splide__slide px-5">
            <div class="card bg-gray border border-warning position-relative mx-n4-5">
              <span class="bg-warning col-4 col-sm-3 text-white text-center position-absolute" style="z-index: 3; border-radius: 10px 0px 20px;">- 10%</span>
              <div class="row">
                <div class="col">
                  <div class="card-header p-0 position-relative z-index-2" style="border-radius: 0.75rem 0px 0px 0.75rem;">
                    <div class="d-block blur-shadow-image cursor-pointer img-marco">
                      <img src="{values.url_imagen}" width="100%" height="160vh" alt="producto" class="shadow img-size img-oferta " style="border-radius: 0.75rem 0px 0px 0.75rem;">
                    </div>
                    <div class="blur opacity-9 col-12 text-dark text-center position-absolute" style="z-index: 3; border-radius: 0px 0px 0px 0.75rem; bottom: 0px; right: 0px; height: 20px; font-size: 15px;">
                      <span class="material-symbols-outlined" style="font-size: 15px;">schedule</span>
                      2 días 13h
                    </div>
                    <div class="colored-shadow" style="background-image: url('{values.url_imagen}');"></div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="pe-4 py-0">
                    <p class="text-dark text-center text-capitalize mt-1 mb-0">{values.nombre.length >= 10 ? values.nombre.substring(0, 10) + "..." : values.nombre}</p>
                    <div class="text-warning text-center border-bottom border-gray mt-1 mb-0">
                      <del class="text-underline text-start text-dark opacity-9" style="font-size: 12px; left: 14px;">$ 5000</del>
                      $4500 <span class="text-dark text-sm">KG</span>
                    </div>
                    <div class="row text-center mt-2">
                      <div class="col-md-10 col-12 mx-auto">
                        <button class="btn col-12 btn-sm btn-success">Agregar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        {/if}
      {/each}
    </ul>
  </div>

  <style>
    .splide__pagination {
    bottom: -1.3em;
    left: 0;
    padding: 0 1em;
    position: absolute;
    right: 0;
    z-index: 1;
}
  </style>

</div>
