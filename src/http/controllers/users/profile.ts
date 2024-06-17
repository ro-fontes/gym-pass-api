import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use.case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileUseCase = makeGetUserProfileUseCase();

  const { user } = await getUserProfileUseCase.execute({
    userId: request.user.sub
  });

  return reply.status(200).send({ user: { ...user, passwordHash: undefined } });
}
