<script>
	import Footer from '../components/Footer.svelte';
    import { eliminarProducto } from '../api/productos';
    import MenuAcciones from '../components/MenuLateral.svelte';
    import HeaderAdmin from '../components/HeaderAdmin.svelte';
</script>

<main>

    <div class="row m-0" style="padding-left: 4.5rem;">
        <MenuAcciones/>
        <div class="col">
            <div class="row">
                <h4 class="col-6 text-dark pt-3">Dashboard</h4>
          
            </div>

            <div class="row">
                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div class="card">
                        <div class="card-body p-3">
                            <div class="row">
                                <div class="col-8">
                                    <div class="numbers">
                                        <p class="text-sm mb-0 text-uppercase font-weight-bold">Avistamientos</p>
                                        <h5 class="font-weight-bolder">1253</h5>
                                        <p class="mb-0">Total</p>
                                    </div>
                                </div>
                                <div class="col-4 text-end">
                                    <div class="icon icon-shape bg-gradient-info shadow-success text-center rounded-circle">
                                        <i class="fas fa-eye text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div class="card">
                        <div class="card-body p-3">
                            <div class="row">
                                <div class="col-8">
                                    <div class="numbers">
                                        <p class="text-sm mb-0 text-uppercase font-weight-bold">Avistamientos</p>
                                        <h5 class="font-weight-bolder">1253</h5>
                                        <p class="mb-0">Total</p>
                                    </div>
                                </div>
                                <div class="col-4 text-end">
                                    <div class="icon icon-shape bg-gradient-info shadow-success text-center rounded-circle">
                                        <i class="fas fa-eye text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div class="card">
                        <div class="card-body p-3">
                            <div class="row">
                                <div class="col-8">
                                    <div class="numbers">
                                        <p class="text-sm mb-0 text-uppercase font-weight-bold">Avistamientos</p>
                                        <h5 class="font-weight-bolder">1253</h5>
                                        <p class="mb-0">Total</p>
                                    </div>
                                </div>
                                <div class="col-4 text-end">
                                    <div class="icon icon-shape bg-gradient-info shadow-success text-center rounded-circle">
                                        <i class="fas fa-eye text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div class="card">
                        <div class="card-body p-3">
                            <div class="row">
                                <div class="col-8">
                                    <div class="numbers">
                                        <p class="text-sm mb-0 text-uppercase font-weight-bold">Avistamientos</p>
                                        <h5 class="font-weight-bolder">1253</h5>
                                        <p class="mb-0">Total</p>
                                    </div>
                                </div>
                                <div class="col-4 text-end">
                                    <div class="icon icon-shape bg-gradient-info shadow-success text-center rounded-circle">
                                        <i class="fas fa-eye text-lg opacity-10" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row mt-4">
                <div class="col-7">
                    <div class="card" style="background-image: url('https://i.pinimg.com/736x/0d/5d/8f/0d5d8fb137354e37cb5e1b8f06de34a5.jpg'); height: 100%; background-repeat: no-repeat; background-size: cover;">
                        
                    </div>
                </div>

                <div class="col-5">
                    <HeaderAdmin/>
                </div>
            
        </div>
    </div>
    
    <Footer/>
</main>
