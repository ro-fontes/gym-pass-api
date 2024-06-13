import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists.error";
import { RegisterUserCase } from "@/use-cases/register";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUserCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUserCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "qj7kK@example.com",
      password: "123456"
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "qj7kK@example.com",
      password: "123456"
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.passwordHash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456"
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456"
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
