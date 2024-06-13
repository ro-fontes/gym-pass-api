import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { FetchUserCheckInsHistoryUseCase } from "@/use-cases/fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch User Check-in history Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

    // await gymsRepository.create({
    //   id: "gym-01",
    //   title: "JavaScript Gym",
    //   description: "",
    //   phone: "",
    //   latitude: -23.545678,
    //   longitude: -46.645678
    // });
  });

  it("should be able to fetch check-in history", async () => {
    await checkInsRepository.create({
      gymId: "gym-01",
      userId: "user-01"
    });

    await checkInsRepository.create({
      gymId: "gym-02",
      userId: "user-01"
    });

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: "gym-01" }),
      expect.objectContaining({ gymId: "gym-02" })
    ]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gymId: `gym-${i}`,
        userId: "user-01"
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: "gym-21" }),
      expect.objectContaining({ gymId: "gym-22" })
    ]);
  });
});
