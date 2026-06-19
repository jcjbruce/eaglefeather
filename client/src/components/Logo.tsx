export function EagleFeatherLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="EagleFeather logo"
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
