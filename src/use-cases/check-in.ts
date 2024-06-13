import { CheckIn } from "@prisma/client";

import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface UseCaseRequest {
  userId: string;
  gymId: string;
}

interface UseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, gymId }: UseCaseRequest): Promise<UseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      userId,
      gymId
    });

    return { checkIn };
  }
}
