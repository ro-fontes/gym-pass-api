import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials.error";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface UseCaseRequest {
  email: string;
  password: string;
}

interface UseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ email, password }: UseCaseRequest): Promise<UseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.passwordHash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
