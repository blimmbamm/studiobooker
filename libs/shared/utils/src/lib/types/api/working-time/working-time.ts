export type WorkingTime = {
  id: number;
  weekday: string;
  activated: boolean;
  start: string;
  end: string;
};

export type EditWorkingTimeDto = {
  weekday?: string;
  activated?: boolean;
  start: string;
  end: string;
};
