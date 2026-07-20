type ConfidenceBarProps = {
  confidence: number;
};

export function ConfidenceBar({
  confidence,
}: ConfidenceBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
  Confidence
</span>

<span className="font-medium">
  {confidence}%
</span>
      </div>

      <div
  className="h-2.5 overflow-hidden rounded-full bg-white/10"
  role="progressbar"
  aria-valuenow={confidence}
  aria-valuemin={0}
  aria-valuemax={100}
>
        <div
          className={`h-full origin-left rounded-full transition-all duration-500 ${
            confidence >= 80
              ? "bg-green-500"
              : confidence >= 50
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{
            width: `${confidence}%`,
          }}
        />
      </div>
    </div>
  );
}