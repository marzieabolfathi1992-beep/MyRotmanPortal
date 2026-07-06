import { CalendarDays, Search, Loader2 } from "lucide-react";

interface Props {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function DateSearchBar({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  onSearch,
  loading,
}: Props) {
  const today = new Date().toISOString().split("T")[0];

  const handleCheckInChange = (val: string) => {
    onCheckInChange(val);
    if (checkOut && val >= checkOut) {
      const next = new Date(val);
      next.setDate(next.getDate() + 1);
      onCheckOutChange(next.toISOString().split("T")[0]);
    }
  };

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const canSearch = !!(checkIn && checkOut && nights > 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border p-4 md:p-5">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          {/* Check-in */}
          <div className="flex-1 relative">
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1.5 pl-1">
              Check-in
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full pl-9 pr-3 py-3 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ "--tw-ring-color": "#E20778" } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:flex items-end pb-3">
            <div className="w-6 h-px bg-border" />
          </div>

          {/* Check-out */}
          <div className="flex-1 relative">
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1.5 pl-1">
              Check-out
            </label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="date"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => onCheckOutChange(e.target.value)}
                className="w-full pl-9 pr-3 py-3 text-sm rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{ "--tw-ring-color": "#E20778" } as React.CSSProperties}
              />
            </div>
          </div>
        </div>

        {/* Nights + Search button */}
        <div className="flex items-end gap-3 sm:pl-2">
          {nights > 0 && (
            <div className="text-center hidden md:block">
              <p className="text-2xl font-bold text-foreground">{nights}</p>
              <p className="text-[10px] text-muted-foreground tracking-wide uppercase">
                {nights === 1 ? "Night" : "Nights"}
              </p>
            </div>
          )}
          <button
            onClick={onSearch}
            disabled={!canSearch || loading}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white whitespace-nowrap transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: canSearch ? "#E20778" : "#cccccc" }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching…
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                {canSearch ? "Search" : "Select dates"}
              </>
            )}
          </button>
        </div>
      </div>

      {canSearch && !loading && (
        <p className="text-xs text-muted-foreground mt-3 pl-1 md:hidden">
          {nights} {nights === 1 ? "night" : "nights"} — tap "Find Rotman Rates" to see hotels
        </p>
      )}
    </div>
  );
}
