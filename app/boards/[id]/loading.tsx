export default function Loading() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Loading board">
      <div className="h-9 w-64 rounded bg-ink/10" />
      <div className="h-2 rounded-full bg-ink/10" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-xl bg-ink/10" />
        ))}
      </div>
    </div>
  );
}
