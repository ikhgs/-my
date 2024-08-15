const express = require('express');
const bodyParser = require('body-parser');
const { handleMessage } = require('./bot');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/receive-message', async (req, res) => {
  const incomingMessage = req.body.message;
  
  if (typeof incomingMessage === 'string') {
    const responseMessage = await handleMessage(incomingMessage);
    res.send({ response: responseMessage });
  } else {
    res.status(400).send({ error: 'Message invalide' });
  }
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
