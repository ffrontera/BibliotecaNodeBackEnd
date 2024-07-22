const logout = document.getElementById('salir');

logout.addEventListener('click', () => {
    sessionStorage.removeItem('token');
    window.location.href = '../index.html';
});