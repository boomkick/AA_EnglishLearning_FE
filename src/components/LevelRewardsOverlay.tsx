"use client";

type Props = {
  level: number;
  rewardPoints: number;
  pointsUsed: number;
  onPointsUsedChange: (value: number) => void;
  onClose: () => void;
};

const VND_PER_POINT = 100_000;

export function LevelRewardsOverlay({
  level,
  rewardPoints,
  pointsUsed,
  onPointsUsedChange,
  onClose,
}: Props) {
  const availablePoints = Math.max(0, rewardPoints - pointsUsed);
  const totalVnd = rewardPoints * VND_PER_POINT;
  const usedVnd = pointsUsed * VND_PER_POINT;
  const availableVnd = availablePoints * VND_PER_POINT;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="mx-4 max-w-md rounded-xl border border-zinc-200 bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">
            Level & rewards
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-zinc-500 hover:bg-zinc-100"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-lg bg-zinc-50 px-4 py-3">
          <div className="text-2xl font-bold text-zinc-900">Level {level}</div>
          <div className="flex-1 text-right">
            <div className="text-xs text-zinc-500">Total earned</div>
            <div className="text-lg font-semibold text-accent">
              {totalVnd.toLocaleString("vi-VN")} VND
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Amount already used (VND)
          </label>
          <input
            type="number"
            min={0}
            max={totalVnd}
            step={VND_PER_POINT}
            value={usedVnd}
            onChange={(e) => {
              const vnd = parseInt(e.target.value, 10) || 0;
              const capped = Math.max(0, Math.min(totalVnd, vnd));
              onPointsUsedChange(Math.round(capped / VND_PER_POINT));
            }}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
            placeholder="0"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Available: {availableVnd.toLocaleString("vi-VN")} VND
          </p>
        </div>

        <div className="mt-4">
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Available balance
          </div>
          <p className="mt-1 text-lg font-semibold text-zinc-900">
            {availableVnd.toLocaleString("vi-VN")} VND
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Earn more XP to level up. Each level = {VND_PER_POINT.toLocaleString("vi-VN")} VND.
          </p>
        </div>

        <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600">
          <p>
            Level up every 500 XP. Each level gives {VND_PER_POINT.toLocaleString("vi-VN")} VND voucher value.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-full bg-accent py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
