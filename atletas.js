document.addEventListener("DOMContentLoaded", function() {
    verificarToken();
    const containerCartoes = document.getElementById('container-cartoes');
    const select = document.getElementById('escolha');
    const buttons = document.querySelectorAll('.button'); // Seleciona todos os botões
    
    function verificarToken() {
      const token = localStorage.getItem('token');
    
      if (!token) {
        // Se o token não for encontrado no localStorage
        const containerCartoes = document.getElementById('container-cartoes');
        containerCartoes.innerHTML = ''; // Limpa qualquer conteúdo existente
    
        const header = document.querySelector('.header');
        header.innerHTML = ''; // Limpa o conteúdo do header
    
        const h1 = document.createElement('h1');
        h1.textContent = 'Usuário não verificado, volte à tela de login';
    
        const btnVoltar = document.createElement('button');
        btnVoltar.textContent = 'Voltar';
        btnVoltar.addEventListener('click', function() {
          window.location.href = 'index.html'; // Redireciona para index.html ao clicar em "Voltar"
        });
    
        header.appendChild(h1);
        header.appendChild(btnVoltar);
      }
    }
    // Função para carregar atletas com base no valor
    const btnSair = document.getElementById('btnSair');
    btnSair.addEventListener('click', function() {
      localStorage.removeItem('token'); // Remove o token do local storage
      window.location.href = 'index.html'; // Redireciona para index.html
    });
    const loadAthletes = function(value) {
      const endpoint = `https://botafogo-atletas.mange.li/${value}`;
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          containerCartoes.innerHTML = ''; // Limpa os cartões anteriores
  
          data.forEach(atleta => {
            const card = document.createElement('a'); // Alteramos o elemento para um link <a>
            card.classList.add('card');
            card.href = `detalhes.html?id=${atleta.id}`; // Adicionamos o ID do jogador à URL
          
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
          
            // Adicionamos um evento de clique para o cartão redirecionar para detalhes.html com o ID do jogador na URL
            card.addEventListener('click', function(event) {
              event.preventDefault(); // Evita o comportamento padrão do link
              window.location.href = `detalhes.html?id=${atleta.id}`; // Redireciona para a página com o ID do jogador na URL
            });
          });
          
        })
        .catch(error => console.error('Erro ao carregar atletas:', error));
    };
  
    // Atribui um evento de clique para cada botão
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const value = this.getAttribute('value'); // Obtém o valor do botão clicado
        loadAthletes(value); // Carrega os atletas com base no valor do botão
      });
    });
  
    // Atribui um evento de mudança para o select
    select.addEventListener('change', function() {
      const value = this.value; // Obtém o valor do select
      loadAthletes(value); // Carrega os atletas com base no valor selecionado no select
    });
  
    // Corrigir o botão "Todos os Atletas"
    const todosAtletasButton = document.querySelector('.button[value="todos"]');
    todosAtletasButton.addEventListener('click', function() {
      loadAthletes('todos'); // Carrega todos os atletas ao clicar neste botão
    });
  });
  
