import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  });

  const { page, query } = querySchema.parse(request.query);

  const searchGymUserCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymUserCase.execute({
    page,
    query
  });

  return reply.status(200).send({
    gyms
  });
}
