import dayjs from 'dayjs';
import { useAppStore, DailyCheckIn } from '../state/store';

export type SurfaceAction = {
  key: string;
  message: string;
  priority: 'green' | 'yellow' | 'red';
};

export function evaluateRules(params: {
  heightCm?: number;
  waistCm?: number;
  recentCheckIns: DailyCheckIn[];
}) {
  const actions: SurfaceAction[] = [];
  const { heightCm, waistCm, recentCheckIns } = params;

  if (heightCm && waistCm) {
    const ratio = waistCm / heightCm;
    if (ratio > 0.5) {
      actions.push({ key: 'waist_ratio_high', message: 'Focus on fat-loss plan and improve sleep', priority: 'yellow' });
    }
  }

  const last7 = recentCheckIns.filter((c) => dayjs().diff(dayjs(c.date), 'day') <= 7);
  const avgSleep = average(last7.map((c) => c.sleepHours ?? 0));
  if (avgSleep > 0 && avgSleep < 6.5) {
    actions.push({ key: 'sleep_low', message: 'Schedule wind-down and push lower-volume workouts', priority: 'yellow' });
  }

  const lastAlcohol = recentCheckIns.find((c) => (c.alcoholUnits ?? 0) >= 5 && dayjs().diff(dayjs(c.date), 'hour') <= 24);
  if (lastAlcohol) {
    actions.push({ key: 'alcohol_recent', message: 'Switch to recovery walk + mobility today', priority: 'green' });
  }

  return actions;
}

function average(arr: number[]) {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}