import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  message: string;
}

interface CarData {
  marca: string;
  modelo: string;
  año: number;
  precio: number;
  kilometraje: number;
  estado: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { message }: RequestBody = await req.json();

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    const googleSheetId = Deno.env.get("GOOGLE_SHEET_ID");
    const googleApiKey = Deno.env.get("GOOGLE_API_KEY");

    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY not configured");
    }

    if (!googleSheetId || !googleApiKey) {
      throw new Error("Google Sheets credentials not configured");
    }

    const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${googleSheetId}/values/A:F?key=${googleApiKey}`;
    const sheetResponse = await fetch(sheetUrl);

    if (!sheetResponse.ok) {
      throw new Error("Failed to fetch Google Sheets data");
    }

    const sheetData = await sheetResponse.json();
    const rows = sheetData.values || [];

    let carInventory = "Stock actual de vehículos:\n\n";

    if (rows.length > 1) {
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length >= 6) {
          carInventory += `- ${row[0]} ${row[1]} (${row[2]})\n`;
          carInventory += `  Precio: $${row[3]}\n`;
          carInventory += `  Kilometraje: ${row[4]} km\n`;
          carInventory += `  Estado: ${row[5]}\n\n`;
        }
      }
    } else {
      carInventory = "No hay vehículos disponibles en este momento.";
    }

    const systemPrompt = `Eres un asistente virtual de Automotora Garin, una automotora en Chile. Tu trabajo es ayudar a los clientes a encontrar el vehículo perfecto para ellos.

Inventario actual:\n${carInventory}\n
Instrucciones:
- Sé amigable, profesional y servicial
- Responde en español chileno
- Si te preguntan por un vehículo específico, proporciona toda la información disponible
- Si el vehículo no está en el inventario, sugiere alternativas similares
- Puedes responder preguntas generales sobre los vehículos
- Si te preguntan por financiamiento o detalles que no tienes, invita al cliente a contactar directamente a un vendedor por WhatsApp
- Mantén las respuestas concisas pero informativas`;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error("Failed to get response from OpenAI");
    }

    const openaiData = await openaiResponse.json();
    const responseText = openaiData.choices[0]?.message?.content || "Lo siento, no pude procesar tu consulta.";

    return new Response(
      JSON.stringify({ response: responseText }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);

    return new Response(
      JSON.stringify({
        response: "Lo siento, hubo un error al procesar tu consulta. Por favor, contacta directamente con nuestros vendedores por WhatsApp.",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
