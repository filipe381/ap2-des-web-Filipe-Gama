document.addEventListener("DOMContentLoaded", function() {
    verificarToken();
    const containerCartoes = document.getElementById('container-cartoes');
    const select = document.getElementById('escolha');
    const buttons = document.querySelectorAll('.button'); 
    
    function verificarToken() {
      const token = localStorage.getItem('token');
    
      if (!token) {
        const containerCartoes = document.getElementById('container-cartoes');
        containerCartoes.innerHTML = ''; 
    
        const header = document.querySelector('.header');
        header.innerHTML = ''; 
    
        const h1 = document.createElement('h1');
        h1.textContent = 'Usuário não verificado, volte à tela de login';
    
        const btnVoltar = document.createElement('button');
        btnVoltar.textContent = 'Voltar';
        btnVoltar.addEventListener('click', function() {
          window.location.href = 'index.html'; 
        });
    
        header.appendChild(h1);
        header.appendChild(btnVoltar);
      }
    }

    const btnSair = document.getElementById('btnSair');
    btnSair.addEventListener('click', function() {
      localStorage.removeItem('token'); 
      window.location.href = 'index.html'; 
    });
    const loadAthletes = function(value) {
      const endpoint = `https://botafogo-atletas.mange.li/${value}`;
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          containerCartoes.innerHTML = ''; 
          data.forEach(atleta => {
            const card = document.createElement('a'); 
            card.classList.add('card');
            card.href = `detalhes.html?id=${atleta.id}`; 
          
            const nome = document.createElement('h2');
            nome.textContent = atleta.nome;
          
            const imagem = document.createElement('img');
            imagem.src = atleta.imagem;
            imagem.alt = atleta.nome;
          
            const saibaMaisBtn = document.createElement('button');
            saibaMaisBtn.textContent = 'Saiba Mais';
          
            card.appendChild(nome);
            card.appendChild(imagem);
            card.appendChild(saibaMaisBtn);
            containerCartoes.appendChild(card);
          
            card.addEventListener('click', function(event) {
              event.preventDefault(); 
              window.location.href = `detalhes.html?id=${atleta.id}`; 
            });
          });
          
        })
        .catch(error => console.error('Erro ao carregar atletas:', error));
    };
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const value = this.getAttribute('value'); 
        loadAthletes(value); 
      });
    });
  
    select.addEventListener('change', function() {
      const value = this.value; 
      loadAthletes(value); 
    });
  
    const todosAtletasButton = document.querySelector('.button[value="todos"]');
    todosAtletasButton.addEventListener('click', function() {
      loadAthletes('todos'); 
    });
  });
  
