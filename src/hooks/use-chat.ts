import { useMutation } from '@tanstack/react-query';
import { SendMessageUseCase } from '@/application/use-cases/chat/SendMessageUseCase';
import { FinalizeConversationUseCase } from '@/application/use-cases/chat/FinalizeConversationUseCase';
import { ChatRepositoryHttp } from '@/infrastructure/repositories/ChatRepositoryHttp';

const chatRepository = new ChatRepositoryHttp();
const sendMessageUseCase = new SendMessageUseCase(chatRepository);
const finalizeConversationUseCase = new FinalizeConversationUseCase(chatRepository);

export function useChat() {
  const sendMutation = useMutation({
    mutationFn: (message: string) => sendMessageUseCase.execute(message),
  });

  const finalizeMutation = useMutation({
    mutationFn: (userId?: string) => finalizeConversationUseCase.execute(userId),
  });

  return {
    sendMessage: sendMutation.mutate,
    sendMessageAsync: sendMutation.mutateAsync,
    isLoading: sendMutation.isPending,
    isError: sendMutation.isError,
    error: sendMutation.error,
    data: sendMutation.data,

    finalizeConversation: finalizeMutation.mutate,
    finalizeConversationAsync: finalizeMutation.mutateAsync,
    isFinalizing: finalizeMutation.isPending,
    finalizeError: finalizeMutation.error,
  };
}
