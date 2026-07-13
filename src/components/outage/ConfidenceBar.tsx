type ConfidenceBarProps = {
  confidence: number;
};

export function ConfidenceBar({
  confidence,
}: ConfidenceBarProps) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>Confidence</span>
        <span>{confidence}%</span>
      </div>

      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full transition-all ${
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