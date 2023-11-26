function verificarToken() {
    const token = localStorage.getItem('token');
    const jogadorDetails = document.querySelector('.detalhes-jogador');
    const botaoVoltar = document.getElementById('botao-voltar');
    
    if (!token) {
      jogadorDetails.innerHTML = '';  
      const h1 = document.createElement('h1');
      h1.textContent = 'Usuário não verificado, volte à tela de login';
  
      const btnVoltar = document.createElement('button');
      btnVoltar.textContent = 'Voltar';
      btnVoltar.addEventListener('click', function() {
        window.location.href = 'index.html'; 
      });
      jogadorDetails.appendChild(h1);
      jogadorDetails.appendChild(btnVoltar);
    } else {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const idJogador = urlParams.get('id');
      
      if (parseInt(idJogador) > 60) {
        jogadorDetails.style.display = 'none';
        const fraseExemplo = document.createElement('p');
        fraseExemplo.textContent = 'ID do jogador não encontrado';
        jogadorDetails.parentNode.insertBefore(fraseExemplo, jogadorDetails.nextSibling);
        const container = document.createElement('div');
        container.appendChild(botaoVoltar);
        jogadorDetails.parentNode.insertBefore(container, jogadorDetails.nextSibling);
      } else {
        const imgJogador = document.getElementById('img-jogador');
        const nomeJogador = document.getElementById('nome-jogador');
        const posicaoJogador = document.getElementById('posicao-jogador');
        const descricaoJogador = document.getElementById('descricao-jogador');
        const nomeCompletoJogador = document.getElementById('nome-completo-jogador');
        const nascimentoJogador = document.getElementById('nascimento-jogador');
        const alturaJogador = document.getElementById('altura-jogador');
  
        fetch(`https://botafogo-atletas.mange.li/${idJogador}`)
            .then(response => response.json())
            .then(data => {
       
                imgJogador.src = data.imagem;
                nomeJogador.textContent = data.nome;
                posicaoJogador.textContent = data.posicao;
                descricaoJogador.textContent = data.descricao;
                nomeCompletoJogador.textContent = data.nome_completo;
                nascimentoJogador.textContent = data.nascimento;
                alturaJogador.textContent = data.altura;
            })
            .catch(error => console.error('Erro ao buscar detalhes do jogador:', error));
      }
    }
  }
  document.addEventListener("DOMContentLoaded", function() {
    verificarToken(); 
    const botaoVoltar = document.getElementById('botao-voltar'); 
    botaoVoltar.addEventListener('click', function() {
      window.location.href = 'atletas.html'; 
    });
  });
  