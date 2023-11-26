function login() {
    var password = document.getElementById("password").value;
    var senha = hex_md5(password).toString();

    if (senha === "e8d95a51f3af4a3b134bf6bb680a213a") {
        localStorage.setItem('token', 'token');
        window.location.href = 'atletas.html';
       
    } else {
        alert('Senha incorreta.');
    }
}