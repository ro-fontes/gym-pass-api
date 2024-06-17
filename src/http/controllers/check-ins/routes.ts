import { FastifyInstance } from "fastify";

import { create } from "@/http/controllers/check-ins/create";
import { history } from "@/http/controllers/check-ins/history";
import { metrics } from "@/http/controllers/check-ins/metrics";
import { validate } from "@/http/controllers/check-ins/validate";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gym/:gymId/check-ins", create);
  app.patch("/check-ins/:checkInId/validate", validate);
}
