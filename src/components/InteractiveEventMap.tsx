import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { EventModel } from "@/contexts/EventStore";
import { MapPin, Navigation, Locate, Calendar, ExternalLink, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface InteractiveEventMapProps {
  events: EventModel[];
  selectedEventId?: string | null;
  onSelectEvent?: (event: EventModel) => void;
  className?: string;
}

const STORAGE_CUSTOM_LOCATION = "nextup_exact_user_location_v1";

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

  const [userLocation, setUserLocation] = useState<[number, number] | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_LOCATION);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCustomLocation, setIsCustomLocation] = useState<boolean>(() => {
    return Boolean(localStorage.getItem(STORAGE_CUSTOM_LOCATION));
  });

  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>(
    isCustomLocation ? "Pin-point Spot Saved 🎯" : "Locating your position..."
  );
  const accuracyCircleRef = useRef<L.Circle | null>(null);
  const navigate = useNavigate();

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Default center: Accra, Ghana
    const map = L.map(mapContainerRef.current, {
      center: userLocation || [5.5506, -0.1962],
      zoom: 12,
      zoomControl: false,
    });

    // Standard 100% free OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      subdomains: "abc",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    mapInstanceRef.current = map;

    // Automatically attempt geolocation if not custom saved
    if (!isCustomLocation) {
      requestUserLocation();
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // IP Geolocation Fallback if Browser Geolocation is blocked/disabled
  const fetchIpLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (res.ok) {
        const data = await res.json();
        if (data.latitude && data.longitude) {
          const coords: [number, number] = [data.latitude, data.longitude];
          if (!isCustomLocation) {
            setUserLocation(coords);
          }
          setLocationStatus(`Location active (${data.city || "Current Location"})`);
          return true;
        }
      }
    } catch {}
    return false;
  };

  // Locate User Position using High-Precision Device GPS + IP Fallback
  const requestUserLocation = () => {
    setLocating(true);
    setLocationStatus("Acquiring high-precision GPS...");

    if (!navigator.geolocation) {
      fetchIpLocation().finally(() => setLocating(false));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        setLocationAccuracy(pos.coords.accuracy);
        setLocating(false);
        setLocationStatus(`GPS Active (±${Math.round(pos.coords.accuracy)}m)`);
      },
      () => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
            setUserLocation(coords);
            setLocationAccuracy(pos.coords.accuracy);
            setLocating(false);
            setLocationStatus("Location Active");
          },
          () => {
            fetchIpLocation().finally(() => setLocating(false));
          },
          { enableHighAccuracy: false, timeout: 6000, maximumAge: 60000 }
        );
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  // Dedicated Effect to Render Draggable User Location Marker + Accuracy Circle
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !userLocation) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }
    if (accuracyCircleRef.current) {
      accuracyCircleRef.current.remove();
    }

    // Render GPS Accuracy Radius Circle if available and not custom drag
    if (locationAccuracy && locationAccuracy < 5000 && !isCustomLocation) {
      const circle = L.circle(userLocation, {
        radius: locationAccuracy,
        color: "#2563eb",
        fillColor: "#3b82f6",
        fillOpacity: 0.12,
        weight: 1.5,
      }).addTo(map);
      accuracyCircleRef.current = circle;
    }

    const userIcon = L.divIcon({
      className: "custom-user-location-marker",
      html: `
        <div class="relative flex items-center justify-center w-12 h-12 z-50 cursor-grab active:cursor-grabbing">
          <span class="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60 animate-ping"></span>
          <span class="relative inline-flex rounded-full h-7 w-7 bg-blue-600 border-2 border-white shadow-2xl flex items-center justify-center text-white text-[12px] font-bold">📍</span>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });

    const userMarker = L.marker(userLocation, {
      icon: userIcon,
      draggable: true,
      zIndexOffset: 3000,
    }).addTo(map);

    userMarker.bindPopup(`
      <div style="font-family: sans-serif; text-align: center; padding: 6px; max-width: 200px;">
        <strong style="color: #2563eb; font-size: 14px;">📍 Your Location</strong>
        <p style="font-size: 11px; color: #475569; margin-top: 3px;">
          ${userLocation[0].toFixed(5)}, ${userLocation[1].toFixed(5)}
        </p>
        <div style="margin-top: 6px; font-size: 10.5px; background: #eff6ff; color: #1d4ed8; padding: 5px 8px; border-radius: 8px; border: 1px solid #bfdbfe; font-weight: 600;">
          💡 <strong>Drag this pin</strong> to set your exact house/building spot!
        </div>
      </div>
    `);

    userMarker.on("dragend", (e: any) => {
      const newPos = e.target.getLatLng();
      const coords: [number, number] = [newPos.lat, newPos.lng];
      setUserLocation(coords);
      setIsCustomLocation(true);
      localStorage.setItem(STORAGE_CUSTOM_LOCATION, JSON.stringify(coords));
      setLocationStatus("Pin-point Location Saved 🎯");
      toast.success("Exact location pin saved!");
    });

    userMarkerRef.current = userMarker;
  }, [userLocation, locationAccuracy, isCustomLocation]);

  // Update Event Markers & Map Viewport Bounds
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    const bounds: [number, number][] = [];

    if (userLocation) {
      bounds.push(userLocation);
    }

    events.forEach((evt) => {
      const coords = getEventCoordinates(evt);
      bounds.push(coords);

      const isSelected = evt.id === selectedEventId;
      const isFree = evt.isFree || !evt.price || evt.price.trim().toLowerCase() === "free";
      const pinLabel = isFree ? "Free" : "$";

      // Calculate distance if user location is available
      let distStr = "";
      if (userLocation) {
        const km = getDistanceKm(userLocation[0], userLocation[1], coords[0], coords[1]);
        distStr = `${km} km away`;
      }

      // Create Custom Pin Icon (Free vs Paid $ badge)
      const pinIcon = L.divIcon({
        className: "custom-event-pin",
        html: `
          <div class="group relative flex items-center justify-center transition-transform transform hover:scale-110 ${
            isSelected ? "scale-110 z-30" : "z-10"
          }">
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-md border transition-colors ${
              isSelected
                ? "bg-black text-white border-black"
                : isFree
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                : "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100"
            }">
              <span class="w-2 h-2 rounded-full ${isFree ? "bg-emerald-500" : "bg-amber-500"}"></span>
              <span>${pinLabel}</span>
            </div>
          </div>
        `,
        iconSize: [64, 28],
        iconAnchor: [32, 14],
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
    } else if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [events, selectedEventId, userLocation]);

  const centerOnUser = () => {
    if (userLocation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(userLocation, 15, { duration: 1.2 });
      if (userMarkerRef.current) {
        userMarkerRef.current.openPopup();
      }
    } else {
      requestUserLocation();
    }
  };

  const resetUserLocation = () => {
    localStorage.removeItem(STORAGE_CUSTOM_LOCATION);
    setIsCustomLocation(false);
    requestUserLocation();
    toast.info("Location reset to GPS auto-detect.");
  };

  return (
    <div className={`relative w-full h-full rounded-3xl overflow-hidden border border-stone-200 shadow-md ${className}`}>
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* User Location Control Bar (Top Left Overlay) */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-stone-200/90 shadow-md max-w-sm">
        <button
          onClick={centerOnUser}
          disabled={locating}
          className="w-8 h-8 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-all disabled:opacity-50 border border-blue-200 flex-shrink-0"
          title="Center on my location"
        >
          <Locate className={`w-4 h-4 text-blue-600 ${locating ? "animate-spin" : ""}`} />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-bold text-stone-900">Map Explorer</span>
            {userLocation ? (
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {isCustomLocation ? "Exact Spot Saved 🎯" : "Location Active"}
              </span>
            ) : (
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                {locationStatus}
              </span>
            )}
          </div>
          <p className="text-[10.5px] text-stone-500 font-medium truncate mt-0.5">
            💡 Drag blue 📍 pin to your exact building or house!
          </p>
        </div>
        {isCustomLocation && (
          <button
            onClick={resetUserLocation}
            className="text-[10px] font-semibold text-stone-500 hover:text-stone-900 underline flex items-center gap-1 ml-auto"
            title="Reset location to auto GPS"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default InteractiveEventMap;
