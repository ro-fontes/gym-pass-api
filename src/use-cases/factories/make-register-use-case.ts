import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";

import { RegisterUserCase } from "@/use-cases/register";

export function makeRegisterUseCase() {
  const userRepository = new PrismaUserRepository();
  const registerUserCase = new RegisterUserCase(userRepository);

  return registerUserCase;
}
