import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

import { prisma } from "@/lib/prisma";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Check-in History (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list check-in history", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -27.2092052,
        longitude: -49.6401091
      }
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gymId: gym.id,
          userId: user.id
        },
        {
          gymId: gym.id,
          userId: user.id
        }
      ]
    });

    const response = await request(app.server)
      .get("/check-ins/history")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gymId: gym.id,
        userId: user.id
      }),
      expect.objectContaining({
        gymId: gym.id,
        userId: user.id
      })
    ]);
  });
});
