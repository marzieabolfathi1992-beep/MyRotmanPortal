export interface Hotel {
  id: string;
  name: string;
  address: string;
  corporateCode: string;
  distance: string;
  distanceKm: number;
  walkTime: string;
  photo: string;
  bookingRating: number;
  startingPrice: number;
  lat: number;
  lng: number;
  buildBookingUrl: (checkIn: string, checkOut: string) => string;
}

export const CAMPUS_LAT = 43.6629;
export const CAMPUS_LNG = -79.3957;

const toMMDDYYYY = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
};

export const hotels: Hotel[] = [
  {
    id: "kimpton-saint-george",
    name: "Kimpton Saint George",
    address: "280 Bloor Street West, Toronto, ON  M5S 1V8",
    corporateCode: "100217931",
    distance: "0.4 km from campus",
    distanceKm: 0.4,
    walkTime: "5-min walk to 105 St. George St.",
    photo: "/hotels/kimpton.avif",
    bookingRating: 8.5,
    startingPrice: 285,
    lat: 43.6685,
    lng: -79.3993,
    buildBookingUrl: (checkIn, checkOut) => {
      const base =
        "https://www.ihg.com/kimptonhotels/hotels/us/en/saint-george-hotel-toronto-on/yyzbs/hoteldetail" +
        "?fromRedirect=true&qSrt=sBR&qIta=99502056&icdv=99502056&qSlH=YYZBS&qCpid=100217931" +
        "&setPMCookies=true&qSHBrC=KI&qDest=280%20Bloor%20Street%20West%2C%20Toronto%2C%20O";
      if (!checkIn || !checkOut) return base;
      return `${base}&qDtA=${toMMDDYYYY(checkIn)}&qDtD=${toMMDDYYYY(checkOut)}`;
    },
  },
  {
    id: "yorkville-royal-sonesta",
    name: "Yorkville Royal Sonesta",
    address: "220 Bloor St. W., Toronto, ON  M5S 1T8",
    corporateCode: "UFT",
    distance: "0.3 km from campus",
    distanceKm: 0.3,
    walkTime: "4-min walk to 105 St. George St.",
    photo: "/hotels/yorkville.avif",
    bookingRating: 8.4,
    startingPrice: 259,
    lat: 43.6689,
    lng: -79.3951,
    buildBookingUrl: (checkIn, checkOut) => {
      const base = "https://be.synxis.com/?Hotel=31863&Chain=5157&promo=UFT";
      if (!checkIn || !checkOut) return base;
      return `${base}&arrive=${toMMDDYYYY(checkIn)}&depart=${toMMDDYYYY(checkOut)}`;
    },
  },
  {
    id: "park-hyatt",
    name: "Park Hyatt Toronto",
    address: "4 Avenue Road, Toronto, ON  M5R 2E8",
    corporateCode: "CR90372",
    distance: "0.6 km from campus",
    distanceKm: 0.6,
    walkTime: "8-min walk to 105 St. George St.",
    photo: "/hotels/park-hyatt.jpg",
    bookingRating: 9.1,
    startingPrice: 395,
    lat: 43.6706,
    lng: -79.3937,
    buildBookingUrl: (checkIn, checkOut) => {
      const ci = checkIn || "";
      const co = checkOut || "";
      const base =
        "https://www.hyatt.com/shop/rooms/torph?rooms=1&adults=1&kids=0" +
        "&corp_id=CR90372&location=Park%20Hyatt%20Toronto";
      if (!ci || !co) return base;
      return `${base}&checkinDate=${ci}&checkoutDate=${co}`;
    },
  },
  {
    id: "courtyard-marriott",
    name: "Courtyard by Marriott",
    address: "475 Yonge Street, Toronto, ON  M4Y 1X7",
    corporateCode: "UTV",
    distance: "1.2 km from campus",
    distanceKm: 1.2,
    walkTime: "15-min walk to 105 St. George St.",
    photo: "/hotels/courtyard.avif",
    bookingRating: 8.2,
    startingPrice: 189,
    lat: 43.6615,
    lng: -79.3832,
    buildBookingUrl: () => {
      return "https://www.marriott.com/event-reservations/reservation-link.mi?id=1662653776883&key=CORP&app=resvlink";
    },
  },
  {
    id: "chelsea-hotel",
    name: "Chelsea Hotel",
    address: "33 Gerrard St. W., Toronto, ON  M5G 1Z4",
    corporateCode: "NJOSE",
    distance: "1.4 km from campus",
    distanceKm: 1.4,
    walkTime: "17-min walk to 105 St. George St.",
    photo: "/hotels/chelsea.jpg",
    bookingRating: 7.7,
    startingPrice: 169,
    lat: 43.6572,
    lng: -79.3836,
    buildBookingUrl: (checkIn, checkOut) => {
      const base =
        "https://gc.synxis.com/rez.aspx?Hotel=59052&Chain=10316&start=availresults&promo=NJOSE";
      if (!checkIn || !checkOut) return base;
      return `${base}&arrive=${toMMDDYYYY(checkIn)}&depart=${toMMDDYYYY(checkOut)}`;
    },
  },
  {
    id: "doubletree-hilton",
    name: "DoubleTree by Hilton",
    address: "108 Chestnut St., Toronto, ON  M5G 1R3",
    corporateCode: "3117698",
    distance: "1.8 km from campus",
    distanceKm: 1.8,
    walkTime: "22-min walk to 105 St. George St.",
    photo: "/hotels/doubletree.avif",
    bookingRating: 8.1,
    startingPrice: 199,
    lat: 43.6522,
    lng: -79.3831,
    buildBookingUrl: (checkIn, checkOut) => {
      const base =
        "https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=YTOCSDT&corporateCode=3117698&flexibleDates=true";
      if (!checkIn || !checkOut) return base;
      return `${base}&arrivaldate=${checkIn}&departuredate=${checkOut}`;
    },
  },
];
