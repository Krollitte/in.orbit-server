export type createGoalRequest = {
  title: string;
  desiredWeeklyFrequency: number;
};

export type createGoalCompletionRequest = {
  goalId: string;
};
