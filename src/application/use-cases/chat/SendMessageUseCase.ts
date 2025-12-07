import { IChatRepository } from '@/domain/repositories/IChatRepository';

export class SendMessageUseCase {
  constructor(private readonly repository: IChatRepository) {}

  async execute(message: string): Promise<string> {
    return this.repository.sendMessage(message);
  }
}
