import { useMutation } from '@tanstack/react-query';
import { LoginUseCase } from '@/application/use-cases/auth/LoginUseCase';
import { AuthRepository } from '@/infrastructure/repositories/AuthRepository';
import { AuthService } from '@/infrastructure/services/AuthService';

// Dependency Injection
const authService = new AuthService();
const authRepository = new AuthRepository(authService);
const loginUseCase = new LoginUseCase(authRepository);

interface LoginParams {
  email: string;
  pass: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, pass }: LoginParams) => loginUseCase.execute(email, pass),
  });
}
