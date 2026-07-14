import { MapPin, Tag, ExternalLink, ChevronRight, Star, PersonStanding, Copy, Check } from "lucide-react";
import { useState } from "react";
import type { Hotel } from "@/config/hotels";

interface Props {
  hotel: Hotel;
  checkIn: string;
  checkOut: string;
  searched: boolean;
}

export default function HotelCard({ hotel, checkIn, checkOut, searched }: Props) {
  const hasData = !!(checkIn && checkOut);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(hotel.corporateCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — fail silently, code is still visible to copy manually
    }
  };

  const handleBooking = () => {
    const url = hotel.buildBookingUrl(checkIn, checkOut);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const ratingColor =
    hotel.bookingRating >= 9
      ? "#059669"
      : hotel.bookingRating >= 8.5
        ? "#0284c7"
        : hotel.bookingRating >= 8
          ? "#6366f1"
          : "#78716c";

  return (
    <div className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
      {/* Photo header */}
      <div className="relative h-48 sm:h-44 overflow-hidden bg-gray-100">
        <img
          src={hotel.photo}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Partner badge */}
        <div
          className="absolute top-3 right-3 text-[10px] tracking-widest uppercase font-semibold px-2 py-1 rounded-full"
          style={{ color: "#E20778", background: "rgba(255,255,255,0.92)" }}
        >
          Partner
        </div>

        {/* Rating badge */}
        <div
          className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white text-xs font-bold shadow-lg"
          style={{ background: ratingColor }}
          title="Booking.com rating"
        >
          <Star className="w-3 h-3 fill-white" />
          {hotel.bookingRating.toFixed(1)}
          <span className="font-normal opacity-80">/10</span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Name + live availability */}
        <div className="flex items-start gap-2 mb-1">
          <h3 className="font-bold text-foreground text-base group-hover:text-[#E20778] transition-colors leading-snug flex-1">
            {hotel.name}
          </h3>
        </div>

        {/* Live availability badge */}
        {searched && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[11px] font-medium text-green-700">
              ✔ Rotman Rate Available for your dates
            </span>
          </div>
        )}

        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{hotel.address}</p>

        {/* Walk time + distance */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "#fdf2f8", color: "#E20778" }}
          >
            <PersonStanding className="w-3.5 h-3.5" />
            {hotel.walkTime}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {hotel.distance}
          </div>
        </div>

        {/* Starting price */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-[11px] text-muted-foreground">From</span>
          <span className="text-lg font-bold text-foreground">${hotel.startingPrice}</span>
          <span className="text-[11px] text-muted-foreground">/night</span>
          <span className="text-[10px] text-muted-foreground ml-1">(corporate rate)</span>
        </div>

        {/* Corporate code */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 mb-5">
          <Tag className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-medium">
            Corporate Code
          </span>
          <span className="font-mono font-bold text-sm text-foreground">
            {hotel.corporateCode}
          </span>
          <button
            onClick={handleCopyCode}
            className="ml-auto flex items-center justify-center w-6 h-6 rounded-md text-muted-foreground hover:text-[#E20778] hover:bg-pink-50 transition-colors cursor-pointer shrink-0"
            aria-label="Copy corporate code"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5" style={{ color: "#E20778" }} /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="mt-auto space-y-2">
          <button
            onClick={handleBooking}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
            style={
              hasData
                ? { background: "#E20778", color: "#fff" }
                : { background: "transparent", color: "#E20778", border: "1.5px solid #E20778" }
            }
          >
            {hasData ? (
              <>
                <ExternalLink className="w-4 h-4" />
                Check Availability
              </>
            ) : (
              <>
                Check Availability
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

          <a
            href="mailto:ExecutivePrograms@Rotman.Utoronto.Ca"
            className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-medium text-muted-foreground hover:text-[#E20778] hover:bg-pink-50 transition-colors cursor-pointer border border-transparent hover:border-pink-100"
          >
            Questions? Contact Rotman Executive Programs
          </a>
        </div>
      </div>
    </div>
  );
}
