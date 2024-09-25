import './assets/app.css'
import App from './App.svelte'
import './assets/js/material-kit'; // Cambia al archivo JS del tema

const app = new App({
  target: document.getElementById('app'),
})

export default app
