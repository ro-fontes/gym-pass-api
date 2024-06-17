import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });

  const { description, latitude, longitude, phone, title } = bodySchema.parse(
    request.body
  );

  const createGymUserCase = makeCreateGymUseCase();

  await createGymUserCase.execute({
    description,
    latitude,
    longitude,
    phone,
    title
  });

  return reply.status(201).send();
}
