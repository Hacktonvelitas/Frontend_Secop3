import { IChatRepository } from '@/domain/repositories/IChatRepository';
import { chatService } from '../services/ChatService';

export class ChatRepositoryHttp implements IChatRepository {
  async sendMessage(message: string): Promise<string> {
    return chatService.sendMessage(message);
  }

  async finalizeConversation(userId?: string): Promise<string> {
    return chatService.finalizeConversation(userId);
  }
}
