import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import type { createGoalCompletionRequest } from "../@types/createGoalRequest";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import dayjs from "dayjs";

export async function createGoalCompletion({
  goalId,
}: createGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf("week").toDate();
  const lastDayOfWeek = dayjs().endOf("week").toDate();
  const goalsCompletionsCount = db.$with("goals_completions_count").as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as("completionCount"),
      })
      .from(goalCompletions)
      .where(
        and(
          lte(goalCompletions.createdAt, lastDayOfWeek),
          gte(goalCompletions.createdAt, firstDayOfWeek),
          eq(goalCompletions.goalId, goalId)
        )
      )
      .groupBy(goalCompletions.goalId)
  );

  const result = await db
    .with(goalsCompletionsCount)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount: sql`
        COALESCE(${goalsCompletionsCount.completionCount}, 0)
        `.mapWith(Number),
    })
    .from(goals)
    .leftJoin(goalsCompletionsCount, eq(goalsCompletionsCount.goalId, goals.id))
    .where(eq(goals.id, goalId))
    .limit(1);

  const { completionCount, desiredWeeklyFrequency } = result[0];
  if (completionCount >= desiredWeeklyFrequency) {
    throw new Error("Goal already completed this week");
  }
  const createdGoalsCompletionArray = await db
    .insert(goalCompletions)
    .values({
      goalId,
    })
    .returning();

  const createdGoalCompletion = createdGoalsCompletionArray[0];

  return { createdGoalCompletion };
}
