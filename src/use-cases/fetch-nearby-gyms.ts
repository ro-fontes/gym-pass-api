import { Gym } from "@prisma/client";

import { GymsRepository } from "@/repositories/gyms-repository";

interface UseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface UseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUserCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude
  }: UseCaseRequest): Promise<UseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    });

    return { gyms };
  }
}
