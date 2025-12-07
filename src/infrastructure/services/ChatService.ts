import { httpClient } from '../http/httpClient';

const CHAT_API_URL = 'http://54.91.71.240:8005';

export class ChatService {
  async sendMessage(text: string): Promise<string> {
    const response = await httpClient.post<string>(
      '/chat',
      {
        text,
        mode: 'hybrid',
        filters: {
          additionalProp1: {}
        },
        user_id: 'default_user'
      },
      {
        // Override base URL logic if httpClient supports full URLs, 
        // OR we can manually fetch here given this API is on a different port/host 
        // than the main application API usually handled by httpClient generic.
        // For safety/simplicity in this specific task avoiding changing the generic client 
        // to handle absolute URLs if strictly relative, I will use fetch directly OR 
        // assume/adapt httpClient. 
        // Let's use direct generic logic but bypassing the BASE_URL concatenation if possible
        // or just writing a specific fetch here to avoid breaking the existing client convention.
      }
    );
    return response;
  }
}

// Re-implementing specific fetch logic to guarantee correct host usage (54.91.71.240:8005)
// independent of the main app API_URL env var.
export const chatService = {
  async sendMessage(text: string): Promise<string> {
    const response = await fetch(`${CHAT_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        text,
        user_id: 'default_user'
      })
    });

    if (!response.ok) {
      throw new Error(`Chat Service Error: ${response.status}`);
    }

    const data = await response.json();
    return data as string;
  },

  async finalizeConversation(userId: string = 'default_user'): Promise<string> {
    const response = await fetch(`${CHAT_API_URL}/finalize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId
      })
    });

    if (!response.ok) {
      throw new Error(`Finalize Service Error: ${response.status}`);
    }

    const data = await response.json();

    // El API retorna un objeto con formato: { error: string, raw_response: string }
    // o un objeto JSON con { resumen_conversacion, puntos_importantes, pasos_desarrollo }
    if (typeof data === 'object' && data !== null) {
      // Si hay un campo raw_response, usarlo
      if (data.raw_response) {
        return data.raw_response;
      }
      // Si hay un campo error, lanzar excepción
      if (data.error) {
        throw new Error(data.error);
      }
      // Si tiene la estructura de resumen de conversación
      if (data.resumen_conversacion !== undefined) {
        let formattedResponse = `**Resumen de la conversación:**\n\n${data.resumen_conversacion}`;

        if (data.puntos_importantes && Array.isArray(data.puntos_importantes) && data.puntos_importantes.length > 0) {
          formattedResponse += '\n\n**Puntos importantes:**\n';
          data.puntos_importantes.forEach((punto: string, index: number) => {
            formattedResponse += `${index + 1}. ${punto}\n`;
          });
        }

        if (data.pasos_desarrollo && Array.isArray(data.pasos_desarrollo) && data.pasos_desarrollo.length > 0) {
          formattedResponse += '\n**Pasos de desarrollo:**\n';
          data.pasos_desarrollo.forEach((paso: string, index: number) => {
            formattedResponse += `${index + 1}. ${paso}\n`;
          });
        }

        return formattedResponse;
      }
      // Si es otro objeto, convertir a JSON string
      return JSON.stringify(data);
    }

    return data as string;
  }
};
