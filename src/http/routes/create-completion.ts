import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { createGoalCompletion } from "../../functions/create-goal-completion";

const goalcompletionZodSchema = {
  schema: {
    body: z.object({
      goalId: z.string(),
    }),
  },
};

export const createCompletionRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/completion",
    goalcompletionZodSchema,
    async (request, response) => {
      const { goalId } = request.body;
      await createGoalCompletion({ goalId });
    }
  );
};
