import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { EventModel } from "@/contexts/EventStore";
import { MapPin, Navigation, Locate, Calendar, ExternalLink, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface InteractiveEventMapProps {
  events: EventModel[];
  selectedEventId?: string | null;
  onSelectEvent?: (event: EventModel) => void;
  className?: string;
}

// Known coordinates mapping for fallback cities/venues in Ghana & beyond
const KNOWN_COORDINATES: Record<string, [number, number]> = {
  accra: [5.5506, -0.1962],
  legon: [5.658, -0.187],
  osu: [5.556, -0.18],
  airport: [5.6, -0.187],
  cantonments: [5.575, -0.175],
  eastlegon: [5.635, -0.155],
  spintex: [5.62, -0.11],
  tema: [5.6698, -0.0166],
  kumasi: [6.6885, -1.6244],
  takoradi: [4.8845, -1.7554],
  capecoast: [5.1053, -1.2466],
  tamale: [9.4075, -0.8533],
};

function getEventCoordinates(event: EventModel): [number, number] {
  if (typeof event.latitude === "number" && typeof event.longitude === "number") {
    return [event.latitude, event.longitude];
  }
  const venueKey = event.venue.toLowerCase().replace(/[^a-z]/g, "");
  const cityKey = event.city.toLowerCase().replace(/[^a-z]/g, "");

  if (KNOWN_COORDINATES[venueKey]) return KNOWN_COORDINATES[venueKey];
  if (KNOWN_COORDINATES[cityKey]) return KNOWN_COORDINATES[cityKey];

  // Deterministic slight offset based on ID string hash so events in same city don't stack on top of each other
  let hash = 0;
  for (let i = 0; i < event.id.length; i++) {
    hash = (hash << 5) - hash + event.id.charCodeAt(i);
    hash |= 0;
  }
  const latOffset = ((Math.abs(hash) % 100) - 50) * 0.0006;
  const lngOffset = (((Math.abs(hash) >> 2) % 100) - 50) * 0.0006;

  const base = KNOWN_COORDINATES[cityKey] || KNOWN_COORDINATES["accra"];
  return [base[0] + latOffset, base[1] + lngOffset];
}

// Calculate distance in km between two lat/lng pairs
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const InteractiveEventMap: React.FC<InteractiveEventMapProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  className = "",
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>("Locating your position...");
  const navigate = useNavigate();

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Default center: Accra, Ghana
    const map = L.map(mapContainerRef.current, {
      center: [5.5506, -0.1962],
      zoom: 12,
      zoomControl: false,
    });

    // Map tile source (Supports Carto, Mapbox, or custom tile server via environment variables)
    const cartoKey = import.meta.env.VITE_CARTO_API_KEY;
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const customTileUrl = import.meta.env.VITE_MAP_TILE_URL;

    const tileUrl = customTileUrl
      ? customTileUrl
      : cartoKey
      ? `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?api_key=${cartoKey}`
      : mapboxToken
      ? `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`
      : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

    const tileLayer = L.tileLayer(tileUrl, {
      subdomains: "abcd",
      attribution:
        '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      tileSize: mapboxToken ? 512 : 256,
      zoomOffset: mapboxToken ? -1 : 0,
    }).addTo(map);

    // Automatic fail-safe fallback to OpenStreetMap if custom tiles encounter network/auth errors
    tileLayer.on("tileerror", () => {
      tileLayer.setUrl("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    mapInstanceRef.current = map;

    // Automatically attempt geolocation
    requestUserLocation();

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Locate User Position using Geolocation API
  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation not supported by browser");
      return;
    }

    setLocating(true);
    setLocationStatus("Locating your position...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        setLocating(false);
        setLocationStatus("Location found");

        if (mapInstanceRef.current) {
          const map = mapInstanceRef.current;

          // Remove existing user marker if any
          if (userMarkerRef.current) {
            userMarkerRef.current.remove();
          }

          // Create User Location Pulse Icon
          const userIcon = L.divIcon({
            className: "custom-user-marker",
            html: `
              <div class="relative flex items-center justify-center w-8 h-8">
                <span class="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping"></span>
                <span class="relative inline-flex rounded-full h-5 w-5 bg-blue-600 border-2 border-white shadow-md"></span>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          const userMarker = L.marker(coords, { icon: userIcon }).addTo(map);
          userMarker.bindPopup(`
            <div style="font-family: sans-serif; text-align: center; padding: 4px;">
              <strong style="color: #2563eb; font-size: 13px;">📍 You Are Here</strong>
              <p style="font-size: 11px; color: #64748b; margin-top: 2px;">Your Current Location</p>
            </div>
          `);

          userMarkerRef.current = userMarker;

          // Smoothly fly to user location if no events selected
          if (!selectedEventId) {
            map.flyTo(coords, 13, { duration: 1.5 });
          }
        }
      },
      (err) => {
        setLocating(false);
        setLocationStatus("Could not fetch location (using default)");
        console.warn("Geolocation warning:", err.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Update Event Markers on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    if (events.length === 0) return;

    const bounds: [number, number][] = [];

    events.forEach((evt) => {
      const coords = getEventCoordinates(evt);
      bounds.push(coords);

      const isSelected = evt.id === selectedEventId;
      const priceText = evt.isFree ? "Free" : evt.price || "Free";

      // Calculate distance if user location is available
      let distStr = "";
      if (userLocation) {
        const km = getDistanceKm(userLocation[0], userLocation[1], coords[0], coords[1]);
        distStr = `${km} km away`;
      }

      // Create Custom Pin Icon
      const pinIcon = L.divIcon({
        className: "custom-event-pin",
        html: `
          <div class="group relative flex items-center justify-center transition-transform transform hover:scale-110 ${
            isSelected ? "scale-110 z-30" : "z-10"
          }">
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg border transition-colors ${
              isSelected
                ? "bg-black text-white border-black"
                : "bg-white text-stone-900 border-stone-200/90 hover:bg-stone-50"
            }">
              <span class="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>${priceText}</span>
            </div>
          </div>
        `,
        iconSize: [80, 30],
        iconAnchor: [40, 15],
      });

      const marker = L.marker(coords, { icon: pinIcon }).addTo(map);

      // Bind Popup HTML
      const popupHtml = `
        <div style="font-family: sans-serif; width: 220px; padding: 2px;">
          <div class="map-popup-clickable" data-event-id="${evt.id}" style="cursor: pointer;">
            <img src="${evt.coverImage}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 12px; margin-bottom: 8px;" />
            <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #e11d48; margin-bottom: 2px;">${evt.category}</div>
            <div style="font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.2; margin-bottom: 4px;">${evt.title}</div>
            <div style="font-size: 12px; color: #64748b; margin-bottom: 6px;">📍 ${evt.venue}, ${evt.city}</div>
            ${distStr ? `<div style="font-size: 11px; font-weight: 600; color: #2563eb; margin-bottom: 8px;">🚀 ${distStr}</div>` : ""}
            <button
              class="map-view-details-btn"
              style="display: block; width: 100%; text-align: center; background: #000; color: #fff; border: none; outline: none; padding: 10px 12px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; margin-top: 4px; transition: opacity 0.2s;"
            >
              View Details →
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on("popupopen", (e) => {
        const popupNode = e.popup.getElement();
        if (popupNode) {
          const clickable = popupNode.querySelector(`.map-popup-clickable[data-event-id="${evt.id}"]`);
          if (clickable) {
            clickable.addEventListener("click", (ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              navigate(`/events/${evt.id}`);
            });
          }
        }
      });

      marker.on("click", () => {
        if (onSelectEvent) onSelectEvent(evt);
      });

      markersRef.current[evt.id] = marker;
    });

    // If an event is selected, center map on it
    if (selectedEventId && markersRef.current[selectedEventId]) {
      const selectedEvt = events.find((e) => e.id === selectedEventId);
      if (selectedEvt) {
        const coords = getEventCoordinates(selectedEvt);
        map.flyTo(coords, 14, { duration: 1.2 });
        markersRef.current[selectedEventId].openPopup();
      }
    } else if (bounds.length > 0 && !userLocation) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [events, selectedEventId, userLocation]);

  return (
    <div className={`relative w-full h-full rounded-3xl overflow-hidden border border-stone-200 shadow-md ${className}`}>
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* User Location Control Bar (Top Left) */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-stone-200/90 shadow-md">
        <button
          onClick={requestUserLocation}
          disabled={locating}
          className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center transition-all disabled:opacity-50"
          title="Find my location"
        >
          <Locate className={`w-4 h-4 text-blue-600 ${locating ? "animate-spin" : ""}`} />
        </button>
        <div>
          <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <span>Map Explorer</span>
            {userLocation && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">Your Location Active</span>}
          </p>
          <p className="text-[11px] text-stone-500 font-medium">
            {events.length} {events.length === 1 ? "Event Pin" : "Event Pins"} on Map
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveEventMap;
