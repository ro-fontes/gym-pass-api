import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;

  searchMany(query: string, page: number): Promise<Gym[]>;

  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
  findById(id: string): Promise<Gym | null>;
}
