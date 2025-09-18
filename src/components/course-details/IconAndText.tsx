export default function IconAndText({
  icon,
  text,
  className,
}: {
  icon: React.ReactNode;
  text: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {icon}
      {text}
    </div>
  );
}
