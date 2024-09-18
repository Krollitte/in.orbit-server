import dayjs from "dayjs";
import { client, db } from ".";
import type { Goal } from "../@types/Goal";
import { goalCompletions, goals } from "./schema";

async function deleteGoalCompletions() {
  await db.delete(goalCompletions);
}

async function deleteGoals() {
  await db.delete(goals);
}

async function createGoals() {
  const results = await db
    .insert(goals)
    .values([
      { title: "Exercise", desiredWeeklyFrequency: 3 },
      { title: "Meditate", desiredWeeklyFrequency: 1 },
      { title: "Read", desiredWeeklyFrequency: 2 },
    ])
    .returning();
  return results;
}

function returnWeekStartDay() {
  const startOfWeek = dayjs().startOf("week");
  return startOfWeek;
}

async function createCompletedGoals(goalsIds: Array<Goal>) {
  await db.insert(goalCompletions).values([
    { goalId: goalsIds[0].id, createdAt: returnWeekStartDay().toDate() },
    {
      goalId: goalsIds[1].id,
      createdAt: returnWeekStartDay().add(1, "day").toDate(),
    },
    {
      goalId: goalsIds[2].id,
      createdAt: returnWeekStartDay().add(2, "day").toDate(),
    },
  ]);
}

function turnOffDatabaseConnection() {
  client.end();
}

async function seed() {
  await deleteGoalCompletions();
  await deleteGoals();
  const goalsIds = await createGoals();
  await createCompletedGoals(goalsIds);
}

seed().finally(turnOffDatabaseConnection);
