import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile";

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUserRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}
