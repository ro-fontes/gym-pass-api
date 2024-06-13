import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

import { CreateGymUserCase } from "@/use-cases/create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUserCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUserCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript Gym",
      description: "Some description.",
      phone: "1199999999",
      latitude: -27.2092052,
      longitude: -49.6401091
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
