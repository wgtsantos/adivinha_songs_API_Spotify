document.getElementById('gameForm').onsubmit = function(event) {
    event.preventDefault();

    // Obter o valor do ID ou URL da playlist e a dificuldade
    let playlistSelect = document.getElementById('playlistId');
    let playlistName = playlistSelect.options[playlistSelect.selectedIndex].text; // Nome da playlist
    let playlistInput = playlistSelect.value;
    let playlistId = playlistInput.includes('spotify.com') ? 
        playlistInput.split('/').pop().split('?')[0] : playlistInput;
    let dificuldade = document.getElementById('dificuldade').value;

    // Redirecionar para o jogo com os parâmetros
    window.location.href = `game.html?playlist=${playlistId}&playlistName=${encodeURIComponent(playlistName)}&dificuldade=${dificuldade}`;
}