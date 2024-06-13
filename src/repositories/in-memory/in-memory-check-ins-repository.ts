import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { Prisma, CheckIn } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: data.id ?? randomUUID(),
      userId: data.userId,
      gymId: data.gymId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: new Date()
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
