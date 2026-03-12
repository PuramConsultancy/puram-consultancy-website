const StatCard = ({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: React.ElementType;
}) => (
  <div className={`relative overflow-hidden rounded-2xl p-5 ${color}`}>
    <div className="pointer-events-none absolute -top-4 -right-4 size-20 rounded-full bg-white/10" />
    <Icon className="size-5 text-white/80" />
    <p className="mt-3 text-2xl font-bold text-white">{value}</p>
    <p className="mt-0.5 text-xs font-medium text-white/70">{label}</p>
  </div>
);

export default StatCard;
