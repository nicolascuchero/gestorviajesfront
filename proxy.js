// proxy.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3001;

const API_KEY = 'f75b8ddb82e8e5071987100a29dabab0';

app.use(cors());

// Ruta proxy para vuelos
app.get('/api/vuelos', async (req, res) => {
  const { origin, destination, currency = 'usd' , direct = false } = req.query;

  //const url = `https://api.travelpayouts.com/v2/prices/latest?currency=${currency}&origin=${origin}&destination=${destination}&token=${API_KEY}`;
  const url = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&unique=false&direct=${direct}&currency=${currency}&limit=30&page=1&one_way=false&token=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al consultar la API externa:', error);
    res.status(500).json({ error: 'Error al obtener vuelos' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy backend escuchando en http://localhost:${PORT}`);
});
