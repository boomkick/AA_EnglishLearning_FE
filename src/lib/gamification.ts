const XP_PER_LEVEL = 500;

export const VND_PER_POINT = 100_000;

export function levelFromXp(xpTotal: number): number {
  return Math.floor(xpTotal / XP_PER_LEVEL) + 1;
}

export function rewardPointsFromLevel(level: number): number {
  return level;
}

export function levelProgress(xpTotal: number) {
  const xpInLevel = xpTotal % XP_PER_LEVEL;
  return {
    xpInLevel,
    xpToNext: XP_PER_LEVEL - xpInLevel,
    levelMin: Math.floor(xpTotal / XP_PER_LEVEL) * XP_PER_LEVEL,
    levelMax: Math.floor(xpTotal / XP_PER_LEVEL) * XP_PER_LEVEL + XP_PER_LEVEL,
  };
}

