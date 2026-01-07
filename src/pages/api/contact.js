export async function POST({ request }) {
  try {
    const body = await request.json();
    const { nombre, apellidos, email, whatsapp, servicio, mensaje, listId } =
      body;

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": import.meta.env.BREVO_API,
      },
      body: JSON.stringify({
        email,
        attributes: {
          NOMBRE: nombre,
          APELLIDOS: apellidos || "", // opcional
          WHATSAPP: whatsapp,
          SERVICIO: servicio || "",
          MENSAJE: mensaje || "",
        },
        listIds: [listId], // tu lista en Brevo
        updateEnabled: true, // actualiza si ya existe
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
