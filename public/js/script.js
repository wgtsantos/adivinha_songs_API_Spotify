let accessToken;
let correctTrack;
let progressInterval;
let options = [];

// Variáveis para controle do jogo
let questCorretas = 0;
let questErradas = 0;
let tentativas = 0;
let maxTentativas = 10;

// Função para obter o token de acesso do Spotify
async function getSpotifyToken() {
    const response = await fetch('/spotify-token');
    const data = await response.json();
    accessToken = data.access_token;
}

// Função para buscar músicas aleatórias de uma playlist
async function getRandomTrack(playlistId, limit) {
    // const playlistId = '37i9dQZF1DWXRqgorJj26U'; Exemplo de uma playlist popular sem usar como parametro
    let trackFound = false;

    while (!trackFound) {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.items.length);
        correctTrack = data.items[randomIndex].track;

        // Verifica se a música tem um preview disponível
        if (correctTrack.preview_url) {
            trackFound = true; // Encontrou uma música com preview
            options = [correctTrack];

            // Adiciona mais 3 opções aleatórias
            while (options.length < 4) {
                const randomOption = data.items[Math.floor(Math.random() * data.items.length)].track;
                if (!options.includes(randomOption)) {
                    options.push(randomOption);
                }
            }

            // Embaralha as opções
            options.sort(() => Math.random() - 0.5);

            displayQuestion();
        } else {
            console.log('Música sem preview, buscando outra...');
        }
    }
}

// Exibe o trecho da música, a imagem do álbum e as opções de resposta
function displayQuestion() {
    const audioPlayer = document.getElementById('audioPlayer');
    const albumImage = document.getElementById('albumImage');
    const progressBar = document.getElementById('progressBar');
    const timer = document.getElementById('timer');

    audioPlayer.src = correctTrack.preview_url; // Exibe o preview da música
    audioPlayer.style.display = 'block';
    albumImage.src = correctTrack.album.images[0].url; // Exibe a imagem do álbum
    albumImage.style.display = 'block'; // Mostra a imagem

    // Inicia a rotação da imagem quando a música começar a tocar
    audioPlayer.onplay = () => {
        albumImage.classList.add('playing');
    };

    // Remove a rotação quando a música for pausada ou terminar
    audioPlayer.onpause = () => {
        albumImage.classList.remove('playing');
    };

    audioPlayer.play(); // Toca a música

    // Iniciar o progresso da barra e o timer
    progressBar.value = 0;
    timer.innerText = '30s'; // Reiniciar o timer
    clearInterval(progressInterval); // Limpar o intervalo anterior, se houver

    const totalDuration = 30; // Duração da prévia
    let timeRemaining = totalDuration;

    progressInterval = setInterval(() => {
        timeRemaining -= 1;
        progressBar.value = totalDuration - timeRemaining; // Atualiza a barra de progresso
        timer.innerText = `${timeRemaining}s`; // Atualiza o tempo restante

        if (timeRemaining <= 0) {
            clearInterval(progressInterval); // Para o timer
            revealCorrectAnswer(); // Mostra a resposta correta
        }
    }, 1000);

    audioPlayer.onended = () => {
        clearInterval(progressInterval);
        revelarResposta();
    };

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Limpa as opções anteriores

    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-primary', 'option-button', 'd-flex', 'align-items-center'); // Adiciona classes Bootstrap e personalizadas
    
        // Criar o ícone para adicionar ao botão
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-music', 'me-2'); // Adiciona a classe do ícone (ícone de música) e margem à direita
    
        // Criar o nome da música como um span para ser adicionado após o ícone
        const buttonText = document.createElement('span');
        buttonText.innerText = option.name;
    
        // Adicionar o ícone e o texto ao botão
        button.appendChild(icon);
        button.appendChild(buttonText);
    
        // Adicionar o evento de clique
        button.onclick = () => checkAnswer(option, button); // Passa o botão clicado
        optionsDiv.appendChild(button); // Adiciona o botão à div de opções
    });
}

// Mostra a resposta correta automaticamente
function revelarResposta() {
    const allButtons = document.querySelectorAll('#options button');
    allButtons.forEach(button => {
        button.disabled = true;

        if (button.innerText === correctTrack.name) {
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-success'); // Aplica o estilo correto
        } else {
            button.classList.remove('btn-outline-primary');
        }
    });

    tentativas++;

    document.getElementById('nextButton').style.display = 'block';
    document.getElementById('albumImage').classList.remove('playing');
}

// Verifica se a resposta está correta e marca as opções de acordo
function checkAnswer(selected, selectedButton) {
    const resultDiv = document.getElementById('result');
    const albumImage = document.getElementById('albumImage');
    const allButtons = document.querySelectorAll('#options button'); // Todos os botões

    // Para a rotação da imagem ao selecionar qualquer resposta
    albumImage.classList.remove('playing');
    document.getElementById('audioPlayer').pause(); // Pausa o áudio

    clearInterval(progressInterval); // Pausar o timer e o progresso

    // Desabilita todos os botões após a escolha
    allButtons.forEach(button => {
        button.disabled = true;

        // Destaca a opção correta em verde
        if (button.innerText === correctTrack.name) {
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-success'); // Aplica o estilo correto
        }

        // Se a opção selecionada for incorreta, marca como vermelha
        if (button === selectedButton && selected.name !== correctTrack.name) {
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-danger'); // Aplica o estilo incorreto
        }
    });

    // Mostra o resultado no div com GIFs
    if (selected.name === correctTrack.name) {
        resultDiv.innerHTML = '<img src="img/correto.gif" alt="Correto!" class="img-thumbnail rounded-4">';
        questCorretas++; // Contabiliza a resposta correta
    } else {
        resultDiv.innerHTML = `<img src="img/incorreto.gif" alt="Incorreto!" class="img-thumbnail rounded-4">`;
        questErradas++; // Contabiliza a resposta errada
    }

    // Mostra o resultado no div
   /* if (selected.name === correctTrack.name) {
        resultDiv.innerHTML = '<p class="correto">Correto!</p>';
        questCorretas++; // Contabiliza a resposta correta

    } else {
        resultDiv.innerHTML = `<p class="errado">Incorreto! A música correta era: ${correctTrack.name}</p>`;
        questErradas++; // Contabiliza a resposta errada
    } */

    tentativas++;

    if (tentativas >= maxTentativas) {
        document.getElementById('btnFinalizar').style.display = 'block'; // Mostra o botão "Finalizar"
        document.getElementById('btnFinalizar').onclick = () => {
            window.location.href = `resultado.html?corretas=${questCorretas}&erradas=${questErradas}&tentativas=${tentativas}`;
        }
    } else {
        document.getElementById('nextButton').style.display = 'block'; // Mostra o botão "Próximo"
    }
}

document.getElementById('nextButton').onclick = () => {
    document.getElementById('result').innerHTML = ''; // Limpa o resultado anterior
    document.getElementById('nextButton').style.display = 'none'; // Esconde o botão "Próximo"
    const queryParams = new URLSearchParams(window.location.search);
    const playlistId = queryParams.get('playlist');
    const dificuldade = queryParams.get('dificuldade');
    getRandomTrack(playlistId, dificuldade);
    // getRandomTrack(); Inicia uma nova rodada

    document.getElementById('contarTentativas').innerText = `Tentativa ${tentativas + 1}/${maxTentativas}`;
};


// Inicializar o jogo ao carregar a página
window.onload = async function() {
    const queryParams = new URLSearchParams(window.location.search);
    const playlistId = queryParams.get('playlist');
    const playlistName = queryParams.get('playlistName'); // Nome da playlist
    const dificuldade = queryParams.get('dificuldade');

    // Verifica se os parâmetros estão presentes
    if (!playlistId || !dificuldade) {
        alert('Você deve escolher uma playlist e uma dificuldade!');
        window.location.href = '/'; // Redireciona para a página inicial
    } else {
    
        // Exibir o nome da playlist no título
        document.getElementById('playlistTitle').innerText = `Tocando Playlist: ${decodeURIComponent(playlistName)}`;

        await getSpotifyToken();
        getRandomTrack(playlistId, dificuldade);

    }
}

/* Obtém o token e começa o jogo
getSpotifyToken().then(() => {
    getRandomTrack();
}); */
