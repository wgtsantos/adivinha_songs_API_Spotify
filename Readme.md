# Adivinha Songs - Jogo de Adivinhação de Músicas usando API do Spotify

## Descrição

Adivinha Songs é uma aplicação web interativa que desafia os jogadores a adivinhar músicas baseadas em pequenos previews fornecidos pela API do Spotify. O jogador escolhe uma playlist pública e um nível de dificuldade, e, em seguida, ouve um preview de músicas aleatórias para tentar adivinhar o nome da faixa entre as opções apresentadas. O jogo conta com recursos como exibição da capa do álbum, limite de tentativas e feedback visual em forma de GIFs animados para respostas corretas e incorretas.

## Funcionalidades Principais

- **Escolha de Playlist e Dificuldade**: O jogador seleciona uma playlist pública do Spotify e define um nível de dificuldade (fácil, médio, difícil), que influencia o número de músicas a serem exibidas.
- **Preview de Músicas**: Um preview de 30 segundos é tocado para cada música, e o jogador deve adivinhar entre 4 opções.
- **Tentativas Limitadas**: O jogador tem até 10 tentativas para adivinhar as músicas.
- **Resultado Final**: Ao término das tentativas, o resultado final é mostrado, e GIFs animados são exibidos de acordo com o desempenho do jogador.
- **Proteção de Páginas**: As páginas de jogo e resultado só podem ser acessadas após a seleção de opções na página inicial, garantindo que o fluxo do jogo seja seguido corretamente.

## Tecnologias Utilizadas

- **Node.js** e **Express** para a criação do servidor backend.
- **API do Spotify** para obter previews de músicas e informações sobre faixas, playlists e álbuns.
- **Bootstrap 5** para o layout responsivo.
- **Font Awesome** para ícones visuais.
- **Select2** para estilização do campo de seleção de playlists.
- **JavaScript** e **jQuery** para a manipulação de eventos e requisições à API.

---

## Instalação e Configuração

### 1. Clonando o Repositório

Clone o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/seu-usuario/adivinha_songs_API_Spotify.git
cd adivinha-songs

```
### 2. Instalar Dependências

Navegue até o diretório do projeto e instale as dependências necessárias utilizando o **npm**:

```bash
npm install

```

### 3. Configurar as Credenciais da API do Spotify

Para usar a API do Spotify, você precisa de **credenciais de cliente** (Client ID e Client Secret). Siga os passos abaixo para obtê-las:

1. Acesse o [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
2. Faça login com sua conta do Spotify e crie uma nova aplicação.
3. Após criar a aplicação, copie o **Client ID** e o **Client Secret**.
4. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```bash
SPOTIFY_CLIENT_ID=seu_client_id
SPOTIFY_CLIENT_SECRET=seu_client_secret

```
Substitua **seu_client_id** e **seu_client_secret** pelos valores fornecidos pelo Spotify. Isso permitirá que sua aplicação autentique e faça chamadas à API do Spotify.

## Contribuição

Contribuições são bem-vindas! Se você quiser contribuir com melhorias, siga os passos abaixo:

1. **Faça um Fork** deste repositório:

   Clique no botão "Fork" no topo da página para criar uma cópia deste repositório na sua conta do GitHub.

2. **Clone o repositório Forkado**:

   Clone o repositório forkado para a sua máquina local utilizando o seguinte comando:

   ```bash
   git clone https://github.com/seu-usuario/adivinha_songs_API_Spotify.git

    ```

## Acesso à Aplicação

Você pode acessar a aplicação rodando no Heroku através do seguinte link:

[**Acesse o Adivinha Songs no Heroku**](https://whispering-forest-10964-1a1caab17faf.herokuapp.com/)

---

Caso deseje rodar a aplicação localmente, siga as instruções fornecidas nas seções anteriores.
