import { Gym, Prisma } from "@prisma/client";

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findById(id: string): Promise<Gym | null>;
}
