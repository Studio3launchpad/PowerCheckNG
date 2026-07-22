import { GlassCard } from "@/components/common/GlassCard";

type Props = {
  budget: string;
  onBudgetChange: (value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
};

export function EnergyBudgetInput({
  budget,
  onBudgetChange,
  onAnalyze,
  isAnalyzing,
}: Props) {
  const budgetValue = Number(budget);

  const canAnalyze =
    Number.isFinite(budgetValue) &&
    budgetValue > 0 &&
    !isAnalyzing;

  return (
    <GlassCard>
      <div>
        <h2 className="text-lg font-bold sm:text-xl">
          Monthly Electricity Budget
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter how much you plan to spend on electricity
          each month.
        </p>
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-foreground">
          Monthly Budget
        </label>

        <div className="relative mt-3">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
            ₦
          </span>

          <input
            type="number"
            min="1"
            value={budget}
            onChange={(event) =>
              onBudgetChange(event.target.value)
            }
            placeholder="25000"
            className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-base outline-none transition focus:border-primary"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onAnalyze}
        disabled={!canAnalyze}
        className="mt-6 w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isAnalyzing
          ? "Analyzing Your Energy Plan..."
          : "Analyze My Energy Plan"}
      </button>
    </GlassCard>
  );
}