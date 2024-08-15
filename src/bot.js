// bot.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Lire les cookies depuis le fichier appstate.json
const appstatePath = path.resolve(__dirname, '../config/appstate.json');
const cookies = JSON.parse(fs.readFileSync(appstatePath, 'utf8'));

// Convertir les cookies en chaîne de cookies
const cookieString = cookies.map(cookie => `${cookie.key}=${cookie.value}`).join('; ');

// Configurer axios pour inclure les cookies dans les requêtes
const apiClient = axios.create({
  baseURL: 'https://gem2-9b-it-njiv.vercel.app/api',
  headers: {
    'Cookie': cookieString,
    'Content-Type': 'application/json'
  }
});

// Fonction pour envoyer un message et obtenir une réponse
const sendMessage = async (message) => {
  try {
    console.log('Envoi du message:', message);
    console.log('Headers envoyés:', apiClient.defaults.headers);
    const response = await apiClient.get('', { params: { ask: message } });
    console.log('Réponse de l\'API:', response.data);
    return response.data; // Retourner la réponse de l'API
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error.response ? error.response.data : error.message);
    return 'Erreur dans l\'envoi du message.';
  }
};

// Fonction pour traiter un message
const handleMessage = async (incomingMessage) => {
  console.log('Message reçu:', incomingMessage);

  if (typeof incomingMessage === 'string' && incomingMessage.trim().length > 0) {
    // Obtenez une réponse de l'API
    const apiResponse = await sendMessage(incomingMessage);
    
    // Retourner la réponse reçue de l'API
    console.log('Réponse de l\'API:', apiResponse);
    return apiResponse;
  } else {
    return 'Message invalide.';
  }
};

// Exporter la fonction pour l'utiliser dans le serveur
module.exports = {
  handleMessage
};
