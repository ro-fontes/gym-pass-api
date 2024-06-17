import { FastifyInstance } from "fastify";

import { authenticate } from "@/http/controllers/users/authenticate";
import { profile } from "@/http/controllers/users/profile";
import { register } from "@/http/controllers/users/register";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { refresh } from "@/http/controllers/users/refresh";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);

  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
