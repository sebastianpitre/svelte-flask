<script>
  import { onMount } from 'svelte';


  let lorem = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis magni iure aliquam quaerat animi quae, aspernatur a, excepturi quis amet, id saepe eius eaque omnis nostrum aut dolore cupiditate provident.";
  let listProductos = []; // Aquí obtienes tu lista de productos

  // Lógica para obtener productos desde API u otra fuente
  onMount(async () => {
    try {
      const responseProductos = await fetch("http://127.0.0.1:5000/api/publico/productos");
      listProductos = await responseProductos.json();
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  });

</script>


  <div class="div">
    <ul class="ul mb-0 border-radius-lg ms-n4">
      {#each listProductos as values}
      {#if values.is_promocion === true && values.is_activo === true }
        <!-- <div class="li me-2 col-8 col-md-5" style="max-width: 300px;">
          <div class="card card-background"  style="height: 120px;">
            <div class="full-background" style="background-image: url('/img/img-sena/sena2.jpeg')"></div>
            <div class="container" style="z-index: 9999;">
              <h5 class="text-white">
                Nombre
              </h5>
              <p class="text-white">{lorem.length >= 50 ? lorem.substring(0, 50) + "..." : lorem}</p>
            </div>
          </div>
        </div> -->

        <div class="col-10 col-sm-4 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 px-2" style="max-width: 350px;">
          <div class="card bg-gray border border-warning position-relative s-s7yunl03pY5L"><span
                  class="bg-warning col-4 col-sm-3 text-white text-center position-absolute s-s7yunl03pY5L"
                  style="z-index: 3; border-radius: 10px 0px 20px;">- 10%</span>
              <div class="row s-s7yunl03pY5L">
                  <div class="col s-s7yunl03pY5L">
                      <div class="card-header p-0 position-relative z-index-2 s-s7yunl03pY5L"
                          style="border-radius: 0.75rem 0px 0px 0.75rem;">
                          <div class="d-block blur-shadow-image cursor-pointer img-marco s-s7yunl03pY5L"><img
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPQMn4n4WDAAq_GTZN22Zc3H-6-s1QsFyp37wOk6snVEkgTRGyBfzSyMyOJzuqkvPPQcc&amp;usqp=CAU"
                                  width="100%" height="160vh" alt="producto"
                                  class="shadow img-size img-oferta  s-s7yunl03pY5L"
                                  style="border-radius: 0.75rem 0px 0px 0.75rem;"></div>
                          <div class="blur opacity-9 col-12 text-dark text-center position-absolute s-s7yunl03pY5L"
                              style="z-index: 3; border-radius: 0px 0px 0px 0.75rem; bottom: 0px; right: 0px; height: 20px; font-size: 15px;">
                              <span class="material-symbols-outlined s-s7yunl03pY5L" style="font-size: 15px;">schedule</span>
                              2 dias 13h</div>
                          <div class="colored-shadow s-s7yunl03pY5L"
                              style="background-image: url(&quot;https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPQMn4n4WDAAq_GTZN22Zc3H-6-s1QsFyp37wOk6snVEkgTRGyBfzSyMyOJzuqkvPPQcc&amp;usqp=CAU&quot;);">
                          </div>
                      </div>
                  </div>
                  <div class="col-6 s-s7yunl03pY5L">
                      <div class="pe-4 py-0 s-s7yunl03pY5L">
                          <p class="text-dark text-center text-capitalize mt-1 mb-0 s-s7yunl03pY5L">AREPA</p>
                          <div class="text-warning text-center border-bottom border-gray mt-1 mb-0 s-s7yunl03pY5L"><del
                                  class="text-underline text-start text-dark opacity-9  s-s7yunl03pY5L"
                                  style="font-size: 12px; left: 14px;">$ 5000</del>
                              $4500 <span class="text-dark text-sm s-s7yunl03pY5L">KG</span></div>
                          <div class="row text-center mt-2 s-s7yunl03pY5L">
                              <div class="col-md-10 col-12 mx-auto s-s7yunl03pY5L"> <button
                                      class="btn col-12 btn-sm btn-success s-s7yunl03pY5L">Agregar</button></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
        {/if}

        
      
      {/each}
    </ul>
  </div>

<style>
    
.div {
    -ms-overflow-style: none;
    box-sizing: border-box;
    display: block;
    overflow: scroll;
    scrollbar-width: none;
}

.ul {
    display: inline-flex;
}




</style>