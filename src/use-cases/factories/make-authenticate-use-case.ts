import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";

import { AuthenticateUseCase } from "@/use-cases/authenticate";

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUserRepository();
  const authenticateUserCase = new AuthenticateUseCase(userRepository);

  return authenticateUserCase;
}
