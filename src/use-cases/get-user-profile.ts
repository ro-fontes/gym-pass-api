import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found.error";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface UseCaseRequest {
  userId: string;
}

interface UseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ userId }: UseCaseRequest): Promise<UseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
