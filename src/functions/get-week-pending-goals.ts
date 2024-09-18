import dayjs, { extend } from "dayjs";

import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, count, lte, sql, gte, eq } from "drizzle-orm";

export async function getWeekPendingGoals() {
  const firstDayOfWeek = dayjs().startOf("week").toDate();
  const lastDayOfWeek = dayjs().endOf("week").toDate();

  const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        createdAt: goals.createdAt,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  );

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
          gte(goalCompletions.createdAt, firstDayOfWeek)
        )
      )
      .groupBy(goalCompletions.goalId)
  );

  const peddingGoals = await db
    .with(goalsCreatedUpToWeek, goalsCompletionsCount)
    .select({
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
      completionCount: sql`
      COALESCE(${goalsCompletionsCount.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(
      goalsCompletionsCount,
      eq(goalsCompletionsCount.goalId, goalsCreatedUpToWeek.id)
    );

  return { peddingGoals };
}
