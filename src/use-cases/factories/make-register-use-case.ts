import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";

import { RegisterUserCase } from "@/use-cases/register";

export function makeRegisterUseCase() {
  const userRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUserCase(userRepository);

  return registerUseCase;
}
