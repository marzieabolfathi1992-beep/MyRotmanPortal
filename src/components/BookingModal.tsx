import { useState } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { hotels } from "@/config/hotels";

interface Props {
  initialHotel: string;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingModal({ initialHotel, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hotel, setHotel] = useState(initialHotel);
  const [courseName, setCourseName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !hotel || !courseName.trim()) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/notify-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantName: name.trim(),
          participantEmail: email.trim(),
          hotelName: hotel,
          courseName: courseName.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "Request failed");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:border-transparent";
  const ringStyle = { "--tw-ring-color": "#E6007E" } as React.CSSProperties;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Already Booked?</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Let us know — we'll send you a welcome email with campus details.
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="h-px bg-border mx-6" />

        {status === "success" ? (
          <div className="px-6 py-10 text-center">
            <CheckCircle className="w-14 h-14 mx-auto mb-4" style={{ color: "#E6007E" }} />
            <h3 className="text-base font-bold text-foreground mb-1">Thank you, {name}!</h3>
            <p className="text-sm text-muted-foreground">
              We've noted your booking at <strong>{hotel}</strong>. Check your inbox — a Welcome
              to Toronto email with campus logistics is on its way.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
              style={{ background: "#E6007E" }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-wide text-foreground mb-1.5 uppercase">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Johnson"
                className={inputCls}
                style={ringStyle}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wide text-foreground mb-1.5 uppercase">
                Your Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputCls}
                style={ringStyle}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wide text-foreground mb-1.5 uppercase">
                Course / Program Name
              </label>
              <input
                type="text"
                required
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="e.g. Executive MBA, Leadership Essentials…"
                className={inputCls}
                style={ringStyle}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wide text-foreground mb-1.5 uppercase">
                Hotel Booked
              </label>
              <select
                required
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
                className={`${inputCls} cursor-pointer`}
                style={ringStyle}
              >
                <option value="">Select a hotel…</option>
                {hotels.map((h) => (
                  <option key={h.id} value={h.name}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white transition-opacity cursor-pointer disabled:opacity-60"
              style={{ background: "#E6007E" }}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending…
                </>
              ) : (
                "Confirm & Get Welcome Email"
              )}
            </button>

            <p className="text-[10px] text-center text-muted-foreground">
              We'll notify your program coordinator and send you campus logistics by email.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
