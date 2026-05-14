import React, { createContext, useContext, useEffect, useState } from 'react';

export type EventMetadata = {
  eventType?: string;
  visibility?: 'public' | 'private';
  modality?: 'physical' | 'virtual' | 'hybrid';
  theme?: string;
  goal?: string;
  budgetMin?: string;
  budgetMax?: string;
  structureSelections?: Record<string, boolean>;
  planningMode?: 'diy' | 'team' | 'hire' | 'ai';
};

export type EventModel = {
  id: string | number;
  title: string;
  date?: string;
  time?: string;
  venue?: string;
  location?: string;
  city?: string;
  guests?: number;
  details?: string;
  milestones?: any[];
  tasks?: any[];
  vendors?: any[];
  budgetItems?: any[];
  guestsList?: any[];
  team?: any[];
  metadata?: EventMetadata;
  status?: 'draft' | 'launched' | 'archived';
  createdAt?: number;
  updatedAt?: number;
};

type EventStoreContext = {
  events: EventModel[];
  saveDraft: (e: Partial<EventModel>) => EventModel;
  publishEvent: (e: Partial<EventModel>) => EventModel;
  getEvent: (id: string | number) => EventModel | undefined;
  updateEvent: (id: string | number, patch: Partial<EventModel>) => EventModel | undefined;
};

const STORAGE_KEY = 'event_store_v1';

const EventStore = createContext<EventStoreContext | null>(null);

export const EventStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || '[]';
      setEvents(JSON.parse(raw));
    } catch {
      setEvents([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // ignore
    }
  }, [events]);

  const saveDraft = (e: Partial<EventModel>) => {
    const id = e.id ?? Date.now();
    const now = Date.now();
    const model: EventModel = {
      id,
      title: (e.title as string) || 'Untitled Event',
      date: e.date,
      time: e.time,
      venue: e.venue,
      location: e.location,
      city: e.city,
      guests: e.guests ?? 0,
      details: e.details ?? '',
      milestones: e.milestones ?? [],
      tasks: e.tasks ?? [],
      vendors: e.vendors ?? [],
      budgetItems: e.budgetItems ?? [],
      guestsList: e.guestsList ?? [],
      team: e.team ?? [],
      metadata: e.metadata ?? {},
      status: 'draft',
      createdAt: e.createdAt ?? now,
      updatedAt: now,
    };

    setEvents(prev => {
      const idx = prev.findIndex(x => String(x.id) === String(id));
      if (idx >= 0) {
        const copy = [...prev]; copy[idx] = model; return copy;
      }
      return [model, ...prev];
    });
    return model;
  };

  const publishEvent = (e: Partial<EventModel>) => {
    const model = saveDraft(e);
    const published = { ...model, status: 'launched', updatedAt: Date.now() };
    setEvents(prev => prev.map(x => String(x.id) === String(model.id) ? published : x));
    return published;
  };

  const getEvent = (id: string | number) => events.find(x => String(x.id) === String(id));

  const updateEvent = (id: string | number, patch: Partial<EventModel>) => {
    let updated: EventModel | undefined;
    setEvents(prev => prev.map(x => {
      if (String(x.id) === String(id)) {
        updated = { ...x, ...patch, updatedAt: Date.now() };
        return updated as EventModel;
      }
      return x;
    }));
    return updated;
  };

  return (
    <EventStore.Provider value={{ events, saveDraft, publishEvent, getEvent, updateEvent }}>
      {children}
    </EventStore.Provider>
  );
};

export const useEventStore = () => {
  const ctx = useContext(EventStore);
  if (!ctx) throw new Error('useEventStore must be used within EventStoreProvider');
  return ctx;
};

export default EventStore;
