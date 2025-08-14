export type SetResult = { reps: number; rpe: number };

export function shouldProgress(lastTwoSets: SetResult[], topRepRange: number) {
  if (lastTwoSets.length < 2) return { progress: false } as const;
  const bothAtTop = lastTwoSets.every((s) => s.reps >= topRepRange && s.rpe <= 7);
  return { progress: bothAtTop } as const;
}

export function recommendProgression({ hasWeights, currentLoadKg, topRepRange }: { hasWeights: boolean; currentLoadKg?: number; topRepRange: number }) {
  if (!hasWeights) return { type: 'reps', deltaReps: 1 } as const;
  const load = currentLoadKg ?? 0;
  const increase = Math.max(0.02 * load, 0.5);
  return { type: 'load', deltaKg: Math.min(0.05 * load, Math.max(1, increase)) } as const;
}