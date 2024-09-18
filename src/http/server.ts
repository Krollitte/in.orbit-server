import fastify from "fastify";
import { createGoal } from "../functions/create-goals";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createGoalRoute } from "./routes/create-goal";
import { createCompletionRoute } from "./routes/create-completion";
import { getPedingGoalsRoute } from "./routes/get-pending-goals";
import { getWeekSummaryRoutes } from "./routes/get-week-summary";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
});

app.register(createGoalRoute);
app.register(createCompletionRoute);
app.register(getPedingGoalsRoute);
app.register(getWeekSummaryRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running");
  });
