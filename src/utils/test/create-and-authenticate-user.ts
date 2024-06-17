import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "qj7kK@example.com",
      passwordHash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER"
    }
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "qj7kK@example.com",
    password: "123456"
  });

  const { token } = authResponse.body;

  return { token };
}
