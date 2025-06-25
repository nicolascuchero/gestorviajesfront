const API_KEY = 'f75b8ddb82e8e5071987100a29dabab0';

export default async function handler(req, res) {
  const { origin, destination, currency = 'usd' , direct = false } = req.query;

  const url = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&unique=false&direct=${direct}&currency=${currency}&limit=30&page=1&one_way=false&token=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al consultar la API externa:', error);
    res.status(500).json({ error: 'Error al obtener vuelos' });
  }
};