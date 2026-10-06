interface StackBadgeProps {
  label: string;
  value: string;
}

export function StackBadge({ label, value }: StackBadgeProps) {
  return (
    <div className="stack-badge">
      <span className="stack-badge-label">{label}</span>
      <span className="stack-badge-value">{value}</span>
    </div>
  );
}
