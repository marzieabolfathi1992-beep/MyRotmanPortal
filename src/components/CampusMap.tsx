import { useEffect, useRef } from "react";
import { hotels, CAMPUS_LAT, CAMPUS_LNG } from "@/config/hotels";
import "leaflet/dist/leaflet.css";

export default function CampusMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<ReturnType<typeof import("leaflet")["map"]> | null>(null);

  useEffect(() => {
    let L: typeof import("leaflet");

    const init = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      L = (await import("leaflet")).default;

      // Fix default icon URLs broken by Vite bundling
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, {
        center: [CAMPUS_LAT, CAMPUS_LNG],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      // Campus marker — magenta
      const campusIcon = L.divIcon({
        html: `<div style="
          width: 44px; height: 44px;
          background: #E6007E;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid #fff;
          box-shadow: 0 3px 12px rgba(232,0,122,0.4);
        "></div>`,
        className: "",
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -48],
      });

      L.marker([CAMPUS_LAT, CAMPUS_LNG], { icon: campusIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,sans-serif; padding: 4px;">
            <strong style="color:#E6007E; font-size:13px;">Rotman School of Management</strong><br/>
            <span style="color:#555; font-size:12px;">105 St. George Street, Toronto</span>
          </div>`,
          { maxWidth: 240 }
        );

      // Hotel markers — dark with magenta ring
      hotels.forEach((hotel) => {
        const hotelIcon = L.divIcon({
          html: `<div style="
            width: 32px; height: 32px;
            background: #0f0f14;
            border-radius: 50%;
            border: 2.5px solid #E6007E;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
            display: flex; align-items: center; justify-content: center;
          ">
            <div style="width:8px;height:8px;background:#E6007E;border-radius:50%;"></div>
          </div>`,
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -20],
        });

        L.marker([hotel.lat, hotel.lng], { icon: hotelIcon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:Inter,sans-serif; padding: 4px;">
              <strong style="color:#0f0f14; font-size:13px;">${hotel.name}</strong><br/>
              <span style="color:#777; font-size:11px;">${hotel.address}</span><br/>
              <span style="color:#E6007E; font-size:11px; font-weight:600;">Code: ${hotel.corporateCode}</span>
            </div>`,
            { maxWidth: 240 }
          );
      });

      // Fit bounds to show all markers
      const allPoints: [number, number][] = [
        [CAMPUS_LAT, CAMPUS_LNG],
        ...hotels.map((h): [number, number] => [h.lat, h.lng]),
      ];
      map.fitBounds(L.latLngBounds(allPoints), { padding: [40, 40], maxZoom: 15 });
    };

    init();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
      {/* Legend */}
      <div className="bg-white border-b border-border px-5 py-3 flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: "#E6007E" }} />
          <span className="text-xs font-medium text-foreground">Rotman Campus</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-[#E6007E]" style={{ background: "#0f0f14" }} />
          <span className="text-xs font-medium text-foreground">Partner Hotels</span>
        </div>
        <p className="text-xs text-muted-foreground ml-auto hidden sm:block">
          Click any marker for details
        </p>
      </div>
      <div ref={mapRef} style={{ height: 460 }} />
    </div>
  );
}
