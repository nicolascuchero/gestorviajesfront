const TOKEN = "f75b8ddb82e8e5071987100a29dabab0";

export async function obtenerVuelos(origen, destino) {
  try {
    const res = await fetch(
      //`https://api.travelpayouts.com/v2/prices/latest?currency=usd&origin=${origen}&destination=${destino}`,
      `http://localhost:3001/api/vuelos?origin=eze&destination=mad`,
      {
        headers: {
          "X-Access-Token": TOKEN,
          Accept: "application/json",
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}