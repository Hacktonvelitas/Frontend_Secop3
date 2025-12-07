import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginUseCase, LogoutUseCase, RegisterUseCase, GetCurrentUserUseCase } from '@/application/use-cases/auth';
import { RegisterData } from '@/domain/repositories/IAuthRepository';

// TODO: Implementar authRepository cuando esté disponible
// Por ahora usamos un placeholder
const authRepository = {
  login: async () => { throw new Error('Not implemented'); },
  logout: async () => { throw new Error('Not implemented'); },
  register: async () => { throw new Error('Not implemented'); },
  getCurrentUser: async () => { throw new Error('Not implemented'); },
};

const loginUseCase = new LoginUseCase(authRepository as any);
const logoutUseCase = new LogoutUseCase(authRepository as any);
const registerUseCase = new RegisterUseCase(authRepository as any);
const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository as any);

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUserUseCase.execute(),
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUseCase.execute(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(['currentUser'], user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutUseCase.execute(),
    onSuccess: () => {
      queryClient.setQueryData(['currentUser'], null);
      queryClient.clear();
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterData) => registerUseCase.execute(data),
    onSuccess: (user) => {
      queryClient.setQueryData(['currentUser'], user);
    },
  });
}
