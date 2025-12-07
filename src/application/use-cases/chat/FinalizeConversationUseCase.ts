import { IChatRepository } from '@/domain/repositories/IChatRepository';

export class FinalizeConversationUseCase {
  constructor(private readonly repository: IChatRepository) {}

  async execute(userId?: string): Promise<string> {
    return this.repository.finalizeConversation(userId);
  }
}
