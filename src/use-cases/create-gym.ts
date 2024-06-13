import { Gym } from "@prisma/client";

import { GymsRepository } from "@/repositories/gyms-repository";

interface UseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface UseCaseResponse {
  gym: Gym;
}

export class CreateGymUserCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title
  }: UseCaseRequest): Promise<UseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    });

    return { gym };
  }
}
