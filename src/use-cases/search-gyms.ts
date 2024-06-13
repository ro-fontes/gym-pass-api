import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface UseCaseRequest {
  query: string;
  page: number;
}

interface UseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUserCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ page, query }: UseCaseRequest): Promise<UseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
