require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Servir arquivos estáticos (HTML, CSS, JS) da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota para obter o token de acesso do Spotify
app.get('/spotify-token', async (req, res) => {
  const clientID = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString('base64')}`
  };

  const data = 'grant_type=client_credentials';

  try {
    const response = await axios.post(tokenUrl, data, { headers });
    res.json(response.data); // Retorna o token de acesso ao front-end
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    res.status(500).send('Erro ao obter o token');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
