/** Shown while a lazily-loaded 3D screen is fetched. */
export function LoadingSplash({ label }: { label: string }) {
  return (
    <div
      role="status"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-deep to-abyss"
    >
      <div className="flex gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-full bg-lagoon"
            style={{ animation: `bob 1s ease-in-out ${i * 0.15}s infinite` }}
          />
        ))}
      </div>
      <p className="text-sm text-foam/70">{label}</p>
    </div>
  );
}
