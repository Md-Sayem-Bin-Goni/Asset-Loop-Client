export default function GlobalLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-600 animate-spin" />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Loading AssetLoop...
      </p>
    </div>
  );
}