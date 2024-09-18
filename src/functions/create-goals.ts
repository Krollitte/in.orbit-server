import type { createGoalRequest } from "../@types/createGoalRequest";
import { db } from "../db";
import { goals } from "../db/schema";

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: createGoalRequest) {
  const createdGoalsArray = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning();

  const createdGoal = createdGoalsArray[0];

  return { createdGoal };
}
