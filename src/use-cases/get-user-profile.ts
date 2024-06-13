import { User } from "@prisma/client";

import { UsersRepository } from "@/repositories/users-repository";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found.error";

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
