<script>
  import { Router, Route, link } from "svelte-routing";
  import Home from "./Home.svelte";
  import Login from "./routes/Login.svelte";
  import Cuenta from "./routes/cuenta.svelte";
  import Productos from "./routes/productos.svelte";
  import Perfil from "./routes/perfil.svelte";
  import Categorias from "./routes/categorias.svelte";
  import ProductForm from "./routes/ProductForm.svelte";
  import CategoryForm from "./routes/CategoryForm.svelte";
  import Usuarios from "./routes/usuarios.svelte";
  import UsuarioForm from "./routes/usuarioForm.svelte";
  import Pedido from "./routes/pedido.svelte";
  import Registro from "./routes/Registro.svelte";
  import PedidosAdmin from "./routes/PedidosAdmin.svelte";
  import Verpedido from "./routes/verpedido.svelte";
  import VerProducto from "./routes/VerProducto.svelte";
  import MisPedidos from "./routes/MisPedidos.svelte";
  import Example from "./routes/example.svelte";
</script>

<main>
  <Router>
    <Route path="/" component={Home} exact />

    <Route path="/login" component={Login} />
    <Route path="/registro" component={Registro} />
    <Route path="/cuenta" component={Cuenta} />
    <Route path="/perfil" component={Perfil} />
    <Route path="/mis_pedidos" component={MisPedidos} />

    <Route path="/categorias" component={Categorias} />
    <Route path="/categoria/nueva" component={CategoryForm} />
    <Route path="/categoria/editar/:id" component={CategoryForm} />

    <Route path="/productos" component={Productos} />
    <Route path="/producto/nuevo" component={ProductForm} />
    <Route path="/producto/editar/:id" component={ProductForm} />
    <Route path="/producto/:id" component={VerProducto} />

    <Route path="/usuarios" component={Usuarios} />
    <Route path="/usuario/nuevo" component={UsuarioForm} />
    <Route path="/usuario/editar/:id" component={UsuarioForm} />

    <Route path="/pedido" component={Pedido} />
    <Route path="/pedidos_admin" component={PedidosAdmin} />
    <Route path="/pedidos_admin/:id" component={Verpedido} />

    <Route path="/example" component={Example} />
  </Router>
</main>
