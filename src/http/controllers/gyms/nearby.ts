import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });

  const { latitude, longitude } = querySchema.parse(request.query);

  const fetchNearbyGymUserCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymUserCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
  });

  return reply.status(200).send({
    gyms
  });
}
