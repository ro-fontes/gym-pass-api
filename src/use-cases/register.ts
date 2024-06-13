import { User } from "@prisma/client";
import { hash } from "bcryptjs";

import { UsersRepository } from "@/repositories/users-repository";

import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists.error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUserCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const user = await this.userRepository.create({
      email,
      name,
      passwordHash
    });

    return { user };
  }
}
