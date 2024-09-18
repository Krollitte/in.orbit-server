import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoal } from "../../functions/create-goals";

const goalZodSchema = {
  schema: {
    body: z.object({
      title: z.string().min(3).max(100),
      desiredWeeklyFrequency: z.number().positive().int().min(1).max(7),
    }),
  },
};

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
  app.post("/goals", goalZodSchema, async (request) => {
    const { title, desiredWeeklyFrequency } = request.body;

    await createGoal({
      title,
      desiredWeeklyFrequency,
    });
  });
};
