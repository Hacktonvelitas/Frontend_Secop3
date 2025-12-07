export interface IChatRepository {
  sendMessage(message: string): Promise<string>;
  finalizeConversation(userId?: string): Promise<string>;
}
