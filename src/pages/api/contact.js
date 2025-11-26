export async function POST({ request }) {
  try {
    const body = await request.json();
    const {
      nombre,
      apellidos,
      email,
      whatsapp,
      servicio,
      mensaje,
      listId,
      userSource,
    } = body;

    // ✅ Validate required fields
    if (!email || !nombre || !servicio || !mensaje) {
      return new Response(
        JSON.stringify({ error: "Campos obligatorios faltantes." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // ✅ Ensure listId is a number
    const listIds = [Number(listId) || 8];

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
          NOMBRE: nombre || "",
          APELLIDOS: apellidos || "",
          WHATSAPP: whatsapp || "",
          SERVICIO: servicio || "",
          MENSAJE: mensaje || "",
          USER_SOURCE: userSource || "",
        },
        listIds,
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    // ✅ Clearer error message
    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: data.message || data || "Error al crear el contacto.",
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error en API Contact:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
