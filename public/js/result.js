 // Captura os parâmetros da URL
 const queryParams = new URLSearchParams(window.location.search);
 const questCorretas = queryParams.get('corretas');
 const questErradas = queryParams.get('erradas');
 const tentativas = queryParams.get('tentativas');

if (!questCorretas || !questErradas || !tentativas) {
    alert('Você não pode acessar o resultado sem jogar!');
    window.location.href = '/'; // Redireciona para a página inicial
} else {

    // Exibe o resultado
    const msgResult = document.getElementById('msgResult');
    msgResult.innerText = `Você acertou ${questCorretas} e errou ${questErradas} de ${tentativas} tentativas!`;

    // Condição para mostrar os GIFs com base no número de acertos
    if (questCorretas === 10) {
        document.getElementById('excelente').style.display = 'block';
    } else if (questCorretas > 5) {
        document.getElementById('vitoria').style.display = 'block';
    } else {
        document.getElementById('derrota').style.display = 'block';
    }
}