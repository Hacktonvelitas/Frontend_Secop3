import { useMutation } from '@tanstack/react-query';
import { RegisterUseCase } from '@/application/use-cases/auth/RegisterUseCase';
import { AuthRepository } from '@/infrastructure/repositories/AuthRepository';
import { AuthService } from '@/infrastructure/services/AuthService';
import { RegisterData } from '@/domain/repositories/IAuthRepository';

// Dependency Injection
const authService = new AuthService();
const authRepository = new AuthRepository(authService);
const registerUseCase = new RegisterUseCase(authRepository);

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterData) => registerUseCase.execute(data),
  });
}
