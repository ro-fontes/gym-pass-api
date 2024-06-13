import { FastifyInstance } from "fastify";

import { authenticate } from "@/http/controllers/authenticate";
import { register } from "@/http/controllers/register";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);

  app.post("/sessions", authenticate);
}
