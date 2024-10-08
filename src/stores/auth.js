let token = localStorage.getItem('access_token') || null;

export function isAuthenticated() {
    // Leer directamente desde localStorage para asegurarse de que siempre es el valor más actualizado
    return localStorage.getItem('access_token') !== null;
}

export async function checkAuth() {
    // Leer directamente desde localStorage para validación
    return localStorage.getItem('access_token') !== null;
}

export async function login({ email, password }) {
    const response = await fetch('http://localhost:8086/api/auth/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    // Aquí mostramos la respuesta completa en la consola
  
    if (response.ok) {
        token = data.access_token;
        
        localStorage.setItem('access_token', token);

    } else {
        throw new Error(data.message || 'Login fallido');
    }
}

export function logout() {
    token = null;
    localStorage.removeItem('access_token');

}
