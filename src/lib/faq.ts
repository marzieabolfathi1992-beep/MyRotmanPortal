import { hotels } from "@/config/hotels";

const CONTACT_LINE =
  "For anything else, reach out to the Rotman Executive Programs Team at ExecutivePrograms@Rotman.Utoronto.Ca and they'll be happy to help.";

interface FaqRule {
  keywords: string[];
  answer: () => string;
}

const nearest = () => [...hotels].sort((a, b) => a.distanceKm - b.distanceKm)[0];

// Reservation contact details per hotel, from the 2026 EP Resource Guide
const HOTEL_RESERVE_INFO: Record<string, { phone: string; email?: string }> = {
  "Kimpton Saint George": { phone: "1-800-KIMPTON or 416-968-0010" },
  "Yorkville Royal Sonesta": { phone: "416-960-5200" },
  "Park Hyatt Toronto": { phone: "1-800-233-1234 or 416-925-1234", email: "reservationstorph@hyatt.com" },
  "Courtyard by Marriott": { phone: "416-924-0611 or 1-800-847-5075" },
  "Chelsea Hotel": { phone: "416-595-1975", email: "cstor.specialtyres@chelseatoronto.com" },
  "DoubleTree by Hilton": { phone: "416-599-0555 or 1-800-668-6600", email: "ytocs_reservations@hilton.com" },
};

const rules: FaqRule[] = [
  {
    keywords: ["direction", "get to", "get there", "address", "campus location", "where is campus", "how do i find", "subway", "ttc", "transit", "streetcar", "bus"],
    answer: () =>
      `Rotman School of Management is at 105 St. George Street, Toronto, ON M5S 3E6 — a short walk from St. George subway station. Four subway stations sit on or near campus: Queen's Park, Museum, St. George, and Spadina. The 506 Carlton and 510 Spadina streetcars reach the southern/western edges of campus, and the 94 Wellesley bus runs through it. Plan your trip at the TTC Trip Planner. ${CONTACT_LINE}`,
  },
  {
    keywords: ["driving", "drive", "car directions", "highway", "hwy", "401", "dvp", "qew"],
    answer: () =>
      `Driving in via Hwy 401 & DVP: take the DVP south to Bloor/Bayview, go west on Bloor St. to St. George St., then turn left (south). Via Hwy 401 & Avenue Rd: head south on Avenue Rd. past Bloor St., right on Harbord St., then right (north) on St. George St. Via the QEW: exit at Spadina Ave., go north to College St., right on College, then left (north) on St. George St. ${CONTACT_LINE}`,
  },
  {
    keywords: ["bike", "cycling", "bicycle"],
    answer: () =>
      `Toronto has cycling routes reaching the St. George campus — see the City of Toronto Cycling Information site for route planning. ${CONTACT_LINE}`,
  },
  {
    keywords: ["closest hotel", "nearest hotel", "which hotel", "best hotel", "recommend a hotel", "closest to campus", "nearest to campus"],
    answer: () => {
      const h = nearest();
      return `${h.name} is the closest partner hotel to campus — about ${h.distanceKm} km away (${h.walkTime}). All 6 partner hotels are shown on this page; use "Sort by" to rank them by distance, rating, or price. ${CONTACT_LINE}`;
    },
  },
  {
    keywords: ["reserve", "reservation", "corporate code", "corporate rate", "hotel phone", "call the hotel", "book by phone", "book directly"],
    answer: () => {
      const lines = hotels
        .map((h) => {
          const info = HOTEL_RESERVE_INFO[h.name];
          if (!info) return null;
          return `${h.name} — ${info.phone}${info.email ? `, ${info.email}` : ""} (code: ${h.corporateCode})`;
        })
        .filter(Boolean)
        .join(" | ");
      return `You can book online through this page (corporate rate pre-applied), or call/email the hotel directly using your Rotman corporate code: ${lines}. Note that rates change seasonally and preferred rates may not apply during events like TIFF. ${CONTACT_LINE}`;
    },
  },
  {
    keywords: ["park", "parking", "car park", "garage"],
    answer: () =>
      `There are 5 parking options near campus: St. George Garage (107 St. George St.), Harbord Street Lot (42 Harbord St.), Graduate House Garage (17 Glen Morris St.), Green P Parking (9 Bedford Rd.), and O.I.S.E Parking Garage (71 Prince Arthur Ave.). For current rates, visit transportation.utoronto.ca/parking/rates. ${CONTACT_LINE}`,
  },
  {
    keywords: ["emergency", "urgent", "911", "safety", "security"],
    answer: () =>
      `For a life-threatening emergency, always call 911 first. If someone needs to reach you urgently while you're in a Rotman Executive Programs class, they can call the Executive Programs office at (416) 946-7557, and staff will deliver the message to you in the classroom or at the next break. ${CONTACT_LINE}`,
  },
  {
    keywords: ["lost", "stolen", "theft", "left my", "missing item"],
    answer: () =>
      `Rotman Executive Programs and the School are not responsible for lost or stolen items — please don't leave laptops, phones, or other personal items unattended. Classrooms remain locked unless a class is in session. ${CONTACT_LINE}`,
  },
  {
    keywords: ["smoke", "smoking", "vape", "vaping", "cannabis"],
    answer: () =>
      `All University of Toronto property, including the St. George campus, has been smoke-free since January 1, 2019 — this covers smoking, vaping, and cannabis. There are exceptions for Indigenous ceremonial activities and medical accommodations. ${CONTACT_LINE}`,
  },
  {
    keywords: ["accessib", "wheelchair", "disability", "mobility"],
    answer: () =>
      `If you have any accessibility needs, please contact ep.accessibility@rotman.utoronto.ca at least one month before your program starts, and the team will work with you on arrangements. ${CONTACT_LINE}`,
  },
  {
    keywords: ["silent room", "reflection room", "prayer", "meditation", "quiet room"],
    answer: () =>
      `There's a Silent/Reflection Room (Room 3088) accessible 24/7, equipped with meditation cushions, prayer mats, and soft seating for meditation, prayer, or quiet time. ${CONTACT_LINE}`,
  },
  {
    keywords: ["nursing room", "parent room", "mother", "breastfeed", "pumping"],
    answer: () =>
      `There's a Parent/Nursing Room (Room 3091) with soft seating and a refrigerator. It must be booked in advance for privacy — please speak to program staff. ${CONTACT_LINE}`,
  },
  {
    keywords: ["gender neutral", "washroom", "bathroom", "restroom"],
    answer: () =>
      `Gender-neutral washrooms are available on the 2nd Floor (Room 2061) and the Lower Level (Room LL1001). ${CONTACT_LINE}`,
  },
  {
    keywords: ["visa", "eta", "electronic travel authorization", "entry requirement", "border", "immigration"],
    answer: () =>
      `Visa-exempt foreign nationals flying to or through Canada need an Electronic Travel Authorization (eTA) — this doesn't apply to U.S. citizens, valid Canadian visa holders, Canadian citizens, or permanent residents. It costs $7 CAD, most approvals come within minutes, and it's valid for up to 5 years. Apply before booking your flight at cic.gc.ca. ${CONTACT_LINE}`,
  },
  {
    keywords: ["wifi", "wi-fi", "internet"],
    answer: () =>
      `Wi-Fi availability at your hotel varies — please check with the hotel's front desk when you check in. ${CONTACT_LINE}`,
  },
  {
    keywords: ["check in", "check-in", "check out", "check-out"],
    answer: () =>
      `Check-in and check-out times vary by hotel — please refer to your confirmation email or contact the hotel directly. ${CONTACT_LINE}`,
  },
  {
    keywords: ["phone", "telephone", "cell phone", "call the office", "contact rotman", "main office"],
    answer: () =>
      `Rotman School of Management's main line is (416) 946-7557. Note that phones at Reception and in the Executive Programs offices aren't available for participant use, and cell phones must be off during class. ${CONTACT_LINE}`,
  },
];

export function getFaqAnswer(userText: string): string {
  const text = userText.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some((kw) => text.includes(kw))) {
      return rule.answer();
    }
  }
  return `I don't have an answer for that one yet. ${CONTACT_LINE}`;
}
