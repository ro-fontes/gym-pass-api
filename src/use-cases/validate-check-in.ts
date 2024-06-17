import { CheckIn } from "@prisma/client";
import dayjs from "dayjs";

import { CheckInsRepository } from "@/repositories/check-ins-repository";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found.error";
import { LateCheckInValidationError } from "@/use-cases/errors/late-check-in-validation.error";

interface UseCaseRequest {
  checkInId: string;
}

interface UseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ checkInId }: UseCaseRequest): Promise<UseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.createdAt,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validatedAt = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
