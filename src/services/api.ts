import { EventModel } from "@/contexts/EventStore";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper for safe fetch with timeout to prevent hanging
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 3000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export const apiService = {
  // Check backend server health
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/health`, { method: "GET" }, 2000);
      return res.ok;
    } catch {
      return false;
    }
  },

  // Auth: Login User
  async login(email: string, password?: string): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const res = await fetchWithTimeout(
        `${API_BASE_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        },
        4000
      );
      const body = await res.json();
      if (res.ok && body.success) {
        return { success: true, data: body.data };
      }
      return { success: false, message: body.message || "Invalid credentials" };
    } catch (err: any) {
      return { success: false, message: err.message || "Backend server unreachable" };
    }
  },

  // Auth: Register User
  async register(name: string, email: string, password?: string, role = "organizer"): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const res = await fetchWithTimeout(
        `${API_BASE_URL}/auth/register`,
        {
          method: "POST",
          body: JSON.stringify({ name, email, password, role }),
        },
        4000
      );
      const body = await res.json();
      if (res.ok && body.success) {
        return { success: true, data: body.data };
      }
      return { success: false, message: body.message || "Registration failed" };
    } catch (err: any) {
      return { success: false, message: err.message || "Backend server unreachable" };
    }
  },

  // Auth: Get current user profile
  async getMe(token: string): Promise<any | null> {
    try {
      const res = await fetchWithTimeout(
        `${API_BASE_URL}/auth/me`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
        3000
      );
      if (!res.ok) return null;
      const body = await res.json();
      return body.success ? body.data : null;
    } catch {
      return null;
    }
  },

  // Fetch all events from Express / MongoDB backend
  async getEvents(params?: { search?: string; category?: string; lat?: number; lng?: number; radiusKm?: number }): Promise<EventModel[] | null> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append("search", params.search);
      if (params?.category && params.category !== "All") queryParams.append("category", params.category);
      if (params?.lat && params?.lng && params?.radiusKm) {
        queryParams.append("lat", params.lat.toString());
        queryParams.append("lng", params.lng.toString());
        queryParams.append("radiusKm", params.radiusKm.toString());
      }

      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/events${queryString ? `?${queryString}` : ""}`;

      const res = await fetchWithTimeout(url, { method: "GET" }, 4000);
      if (!res.ok) return null;

      const body = await res.json();
      if (body.success && Array.isArray(body.data)) {
        // Map backend Mongo documents to EventModel structure
        return body.data.map((item: any) => ({
          id: item._id || item.eventId || `evt-${Math.random()}`,
          ownerId: item.organizer || "org-1",
          title: item.title,
          description: item.description || item.shortDescription || "",
          category: item.category || "Tech",
          coverImage: item.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
          startAt: item.date ? `${item.date}T${item.time || "09:00"}:00Z` : new Date().toISOString(),
          venue: item.venue || "Accra",
          address: `${item.venue || ""}, ${item.city || "Accra"}`.trim(),
          city: item.city || "Accra",
          latitude: item.latitude ?? (item.location?.coordinates?.[1] || 5.5506),
          longitude: item.longitude ?? (item.location?.coordinates?.[0] || -0.1962),
          price: item.isFree ? "Free" : `$${item.price || 0}`,
          isFree: Boolean(item.isFree || item.price === 0),
          organizer: {
            name: item.organizerName || "Event Host",
            type: "Community",
          },
        }));
      }
      return null;
    } catch {
      return null;
    }
  },

  // Fetch single event by ID
  async getEventById(id: string): Promise<EventModel | null> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/events/${id}`, { method: "GET" }, 4000);
      if (!res.ok) return null;
      const body = await res.json();
      if (body.success && body.data) {
        const item = body.data;
        return {
          id: item._id || item.eventId,
          ownerId: item.organizer || "org-1",
          title: item.title,
          description: item.description,
          category: item.category,
          coverImage: item.image,
          startAt: item.date ? `${item.date}T${item.time || "09:00"}:00Z` : new Date().toISOString(),
          venue: item.venue,
          address: `${item.venue}, ${item.city}`,
          city: item.city,
          latitude: item.latitude,
          longitude: item.longitude,
          price: item.isFree ? "Free" : `$${item.price}`,
          isFree: item.isFree,
          organizer: {
            name: item.organizerName || "Event Host",
          },
        };
      }
      return null;
    } catch {
      return null;
    }
  },

  // Create event in MongoDB
  async createEvent(eventData: Partial<EventModel>, token?: string): Promise<EventModel | null> {
    try {
      const res = await fetchWithTimeout(
        `${API_BASE_URL}/events`,
        {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: JSON.stringify({
            title: eventData.title,
            description: eventData.description,
            shortDescription: eventData.description?.slice(0, 120),
            category: eventData.category,
            venue: eventData.venue,
            city: eventData.city,
            latitude: eventData.latitude,
            longitude: eventData.longitude,
            date: eventData.startAt?.split("T")[0] || new Date().toISOString().split("T")[0],
            time: "09:00",
            price: eventData.isFree ? 0 : parseFloat((eventData.price || "0").replace(/[^0-9.]/g, "")) || 0,
            image: eventData.coverImage,
          }),
        },
        5000
      );

      if (!res.ok) return null;
      const body = await res.json();
      if (body.success && body.data) {
        return eventData as EventModel;
      }
      return null;
    } catch {
      return null;
    }
  },
};
