import { useState, useRef, useMemo } from "react";
import Header from "@/components/Header";
import DateSearchBar from "@/components/DateSearchBar";
import HotelCard from "@/components/HotelCard";
import CampusMap from "@/components/CampusMap";
import ChatBot from "@/components/ChatBot";
import { hotels } from "@/config/hotels";
import { CheckCircle2, ChevronRight, ChevronDown, Loader2 } from "lucide-react";

type SortKey = "distance" | "rating" | "price";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "distance", label: "Distance to Campus" },
  { value: "rating", label: "Rating" },
  { value: "price", label: "Price" },
];

export default function HomePage() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("distance");

  const hotelsRef = useRef<HTMLElement>(null);

  const handleSearch = () => {
    if (!checkIn || !checkOut || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
      setTimeout(() => {
        hotelsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }, 1500);
  };

  const sortedHotels = useMemo(() => {
    return [...hotels].sort((a, b) => {
      if (sortBy === "distance") return a.distanceKm - b.distanceKm;
      if (sortBy === "rating") return b.bookingRating - a.bookingRating;
      if (sortBy === "price") return a.startingPrice - b.startingPrice;
      return 0;
    });
  }, [sortBy]);

  const hasDateRange = !!(checkIn && checkOut);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative bg-[#121214] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div
            className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #E20778 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #E20778 0%, transparent 70%)" }}
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/50 text-xs tracking-widest uppercase mb-6 bg-white/5">
              Rotman Executive Programs
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
              Partner Hotel{" "}
              <span style={{ color: "#E20778" }}>Accommodations</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
              Exclusive corporate rates available for Rotman Executive Programs participants at select
              Toronto hotels near the 105 St.&nbsp;George Street campus. Select your dates to see
              availability and pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Date Search Bar */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <DateSearchBar
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
          onSearch={handleSearch}
          loading={loading}
        />
      </div>

      {/* Loading overlay (full-width, between bar and hotels) */}
      {loading && (
        <div className="max-w-6xl mx-auto px-6 mt-12 flex flex-col items-center gap-4 py-16">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: "#E20778", borderTopColor: "transparent" }}
            />
            <div
              className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent animate-ping opacity-20"
              style={{ borderColor: "#E20778" }}
            />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-foreground">Checking live Rotman rates and availability…</p>
            <p className="text-sm text-muted-foreground mt-1">Searching 6 partner hotels for your dates</p>
          </div>
        </div>
      )}

      {/* Hotels Section — hidden until search */}
      {searched && !loading && (
        <section ref={hotelsRef} className="max-w-6xl mx-auto px-6 py-16 scroll-mt-20">
          {/* Section header + sort */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Preferred Partners</p>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-sm font-medium text-green-700">
                  6 hotels available for your dates
                </span>
              </div>
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Sort by</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="appearance-none pl-3 pr-8 py-2 text-sm rounded-xl border border-border bg-white text-foreground focus:outline-none focus:ring-2 cursor-pointer font-medium"
                  style={{ "--tw-ring-color": "#E20778" } as React.CSSProperties}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Hotel grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                checkIn={checkIn}
                checkOut={checkOut}
                searched={searched}
              />
            ))}
          </div>

          {/* Next Step banner */}
          {hasDateRange && (
            <div
              className="mt-10 rounded-2xl overflow-hidden border flex flex-col sm:flex-row items-stretch shadow-sm"
              style={{ borderColor: "#E2077833" }}
            >
              <div
                className="sm:w-2 w-full h-2 sm:h-auto shrink-0"
                style={{ background: "#E20778" }}
              />
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-5 flex-1 bg-[#fdf2f8]">
                <CheckCircle2
                  className="w-8 h-8 shrink-0 hidden sm:block"
                  style={{ color: "#E20778" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-base" style={{ color: "#121214" }}>
                    Next Step — Need Anything Else?
                  </p>
                  <p className="text-sm text-[#6b7280] mt-0.5 leading-relaxed">
                    Once you've reserved your room, connect with the Rotman Executive Programs
                    team for campus details, directions, and parking.
                  </p>
                </div>
                
                  href="mailto:ExecutivePrograms@Rotman.Utoronto.Ca"
                  className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white whitespace-nowrap cursor-pointer transition-opacity hover:opacity-90"
                  style={{ background: "#E20778" }}
                >
                  ExecutivePrograms@Rotman.Utoronto.Ca
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Map Section — always visible */}
      <section className={`max-w-6xl mx-auto px-6 pb-16 ${searched ? "" : "pt-16"}`}>
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Location</p>
          <h2 className="text-2xl font-bold text-foreground">Campus &amp; Hotel Map</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            All partner hotels are within walking distance or a short ride from the Rotman campus.
          </p>
        </div>
        <CampusMap />
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-[#121214]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="font-bold text-white text-lg tracking-tight">Rotman School of Management</span>
            <p className="text-white/40 text-sm mt-1">105 St. George Street, Toronto, ON M5S 3E6</p>
          </div>
          <p className="text-white/30 text-xs text-right">
            Corporate rates are subject to availability.<br />Contact your program coordinator for assistance.
          </p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}
