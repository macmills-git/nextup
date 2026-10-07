import React, { createContext, useContext, useEffect, useState } from 'react';

export type EventCategory =
  | 'Technology'
  | 'Education'
  | 'Business'
  | 'Music & Concerts'
  | 'Parties & Nightlife'
  | 'Sports'
  | 'Career'
  | 'Arts & Culture'
  | 'Community'
  | 'Religion'
  | 'Health & Wellness'
  | 'Other';

export type VendorCategory =
  | 'MC / Host'
  | 'DJ'
  | 'Decoration'
  | 'Sound'
  | 'Lighting'
  | 'Catering / Food'
  | 'Photography'
  | 'Videography'
  | 'Event Planning'
  | 'Security'
  | 'Ushers'
  | 'Venue'
  | 'Equipment Rental'
  | 'Printing / Branding'
  | 'Transport'
  | 'Other';

export type EventStatus = 'draft' | 'preview' | 'published' | 'completed' | 'cancelled';

export type LineupMember = {
  id: string;
  name: string;
  roleTag?: 'Headliner' | 'Speaker' | 'Keynote' | 'Panelist' | 'Performer';
  avatar: string;
  title?: string;
  bio?: string;
  linkedin?: string;
  twitter?: string;
};

export type OrganizerIdentity = {
  name: string;
  logo?: string;
  bio?: string;
  type?: 'Student group' | 'Company' | 'Institution' | 'Community' | 'Individual';
  contact?: string;
};

export type AgendaItem = {
  time: string;
  title: string;
  description?: string;
  speakerName?: string;
};

export type PastEdition = {
  year: string;
  title: string;
  attendeesCount?: string;
  image: string;
  summary: string;
};

export type EventModel = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: EventCategory;
  coverImage: string;
  galleryImages?: string[];
  videoEmbedUrl?: string;
  startAt: string; // ISO date-time string
  endAt?: string;
  venue: string;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  price?: string; // e.g. "Free", "$15", "GHS 50"
  isFree: boolean;
  ticketBadge?: string;
  externalLink?: string;
  contact?: string;
  organizer: OrganizerIdentity;
  lineup?: LineupMember[];
  highlights?: {
    duration?: string;
    format?: 'In person' | 'Online' | 'Hybrid';
    mobileTicket?: boolean;
  };
  refundPolicy?: string;
  organizerStats?: {
    followers?: number;
    eventsCount?: number;
    hostingCount?: number;
  };
  agenda?: AgendaItem[];
  whatToExpect?: string[];
  whoShouldAttend?: string[];
  pastEditions?: PastEdition[];
  status: EventStatus;
  hidden?: boolean;
  createdAt: number;
  updatedAt: number;
};

export type VendorCertificate = {
  id?: string;
  title: string;
  certNumber?: string;
  issuingAuthority?: string;
  issueDate?: string;
  fileUrl: string;
  status?: 'verified' | 'pending';
};

export type VendorPricingPackage = {
  id?: string;
  name: string;
  price: string;
  billingCycle?: string;
  popular?: boolean;
  description: string;
  features: string[];
  deliverables?: string;
};

export type VendorDetailedService = {
  title: string;
  category?: string;
  priceRange?: string;
  description?: string;
  setupIncluded?: boolean;
  turnaroundTime?: string;
  equipmentIncluded?: string[];
  specs?: string;
};

export type VendorMediaFile = {
  id?: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  title?: string;
  caption?: string;
};

export type VendorFAQ = {
  question: string;
  answer: string;
};

export type VendorTestimonial = {
  clientName: string;
  eventTitle: string;
  rating: number;
  comment: string;
  date?: string;
};

export type VendorProfileModel = {
  id: string;
  ownerId: string;
  name: string;
  logo: string;
  description: string;
  categories: VendorCategory[];
  services: VendorDetailedService[];
  pricingPackages?: VendorPricingPackage[];
  location: string;
  city: string;
  serviceArea: string;
  latitude?: number;
  longitude?: number;
  contact: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    instagram?: string;
    website?: string;
    linkedin?: string;
  };
  portfolio: string[];
  mediaFiles?: VendorMediaFile[];
  certificates?: VendorCertificate[];
  businessRegistrationNumber?: string;
  taxIdNumber?: string;
  experienceYears?: number;
  teamSize?: string;
  completedEventsCount?: number;
  rating?: number;
  reviewsCount?: number;
  businessHours?: string;
  paymentTerms?: string;
  faqs?: VendorFAQ[];
  testimonials?: VendorTestimonial[];
  verified: boolean;
  status: 'published' | 'draft';
  hidden?: boolean;
  createdAt: number;
  updatedAt?: number;
};

export type DynamicCategory = {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  enabled: boolean;
  order: number;
};

export type LocationNode = {
  id: string;
  country: string;
  region: string;
  city: string;
  area: string;
  venuesCount?: number;
  enabled: boolean;
};

export type SearchLog = {
  id: string;
  query: string;
  category?: string;
  location?: string;
  count: number;
  status: 'popular' | 'failed' | 'trending';
};

export type AdminUserRecord = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'organizer' | 'vendor' | 'admin';
  status: 'active' | 'suspended';
  registeredAt: number;
  eventsCreatedCount: number;
  savedEventsCount: number;
  reportsSubmittedCount: number;
  vendorProfileId?: string;
};

export type ReportModel = {
  id: string;
  reporterId?: string;
  reporterName?: string;
  targetType: 'event' | 'vendor' | 'user';
  targetId: string;
  targetTitle: string;
  reason: 'Fake event' | 'Spam' | 'Inappropriate content' | 'Misleading information' | 'Duplicate event' | 'Fake vendor' | 'Suspicious account' | 'Other' | string;
  details?: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  createdAt: number;
};

type Ctx = {
  events: EventModel[];
  vendors: VendorProfileModel[];
  savedEventIds: string[];
  reports: ReportModel[];
  categories: DynamicCategory[];
  locations: LocationNode[];
  usersList: AdminUserRecord[];
  searchLogs: SearchLog[];
  // Event Actions
  saveDraftEvent: (e: Partial<EventModel> & { title: string }) => EventModel;
  publishEvent: (id: string) => EventModel | undefined;
  updateEventStatus: (id: string, status: EventStatus) => EventModel | undefined;
  getEvent: (id: string) => EventModel | undefined;
  deleteEvent: (id: string) => void;
  // Saved Events
  toggleSaveEvent: (eventId: string) => void;
  isEventSaved: (eventId: string) => boolean;
  // Vendor Profile Actions
  saveVendorProfile: (v: Partial<VendorProfileModel> & { name: string }) => VendorProfileModel;
  getVendor: (id: string) => VendorProfileModel | undefined;
  getVendorByOwner: (ownerId: string) => VendorProfileModel | undefined;
  toggleVendorVerification: (vendorId: string) => void;
  approveVendorVerification: (vendorId: string) => void;
  rejectVendorVerification: (vendorId: string) => void;
  // Moderation Actions
  submitReport: (report: Omit<ReportModel, 'id' | 'createdAt' | 'status'>) => void;
  toggleHideItem: (targetType: 'event' | 'vendor', targetId: string) => void;
  updateReportStatus: (reportId: string, status: ReportModel['status']) => void;
  // User Actions
  toggleUserStatus: (userId: string) => void;
  // Category Actions
  addCategory: (cat: Omit<DynamicCategory, 'id'>) => void;
  updateCategory: (id: string, patch: Partial<DynamicCategory>) => void;
  deleteCategory: (id: string) => void;
  // Location Actions
  addLocation: (loc: Omit<LocationNode, 'id'>) => void;
  updateLocation: (id: string, patch: Partial<LocationNode>) => void;
  deleteLocation: (id: string) => void;
};

const STORAGE_EVENTS = 'nextup_events_v5';
const STORAGE_VENDORS = 'nextup_vendors_v2';
const STORAGE_SAVED = 'nextup_saved_events_v1';
const STORAGE_REPORTS = 'nextup_reports_v1';

const INITIAL_EVENTS: EventModel[] = [
  {
    id: 'evt-101',
    ownerId: 'user-organizer-1',
    title: 'Pan African AI & Innovation Summit 2026',
    description: 'Join us in person for the Pan African AI & Innovation Summit 2026 to explore cutting-edge AI tech and innovations shaping Africa’s future! Get ready to dive into the future of technology with fellow tech enthusiasts, innovators, and experts from across Africa. Across two inspiring days, we explore ethical AI frameworks, healthcare robotics, natural language processing for African dialects, and venture capital funding for West African deep-tech startups.',
    category: 'Technology',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    startAt: '2026-10-15T09:00:00.000Z',
    endAt: '2026-10-16T17:00:00.000Z',
    venue: 'Kempinski Hotel Gold Coast City Accra',
    address: '66 Gamel Abdul Nasser Avenue',
    city: 'Accra',
    latitude: 5.5506,
    longitude: -0.1970,
    price: 'Free',
    isFree: true,
    ticketBadge: '🔥 FEW TICKETS LEFT',
    externalLink: 'https://accratechsummit.org/register',
    contact: '+233 24 123 4567',
    organizer: {
      name: 'Pan African AI Summit',
      logo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&auto=format&fit=crop&q=80',
      bio: 'Pioneering African artificial intelligence research, ethical AI frameworks, and developer summits.',
      type: 'Community',
      contact: 'hello@panafrisummit.org',
    },
    organizerStats: {
      followers: 408,
      eventsCount: 3,
      hostingCount: 1,
    },
    highlights: {
      duration: '1 day 8 hours',
      format: 'In person',
      mobileTicket: true,
    },
    refundPolicy: 'Refunds up to 7 days before event',
    whatToExpect: [
      'Keynote presentations by international AI pioneers and African tech leaders',
      'Live technical workshops on LLMs, computer vision, and medical diagnostic AI',
      'Pan-African Startup Pitching & VC Investor Networking Sessions',
      'Exhibition Hall with 25+ cutting-edge AI product demos and research labs',
    ],
    whoShouldAttend: [
      'Software Engineers & Developers',
      'AI & Data Science Researchers',
      'Startup Founders & Tech Executives',
      'Venture Capitalists & Angel Investors',
      'University Students & Academics',
    ],
    agenda: [
      {
        time: '09:00 AM - 10:00 AM',
        title: 'Opening Ceremony & Keynote: Harnessing AI for African Growth',
        description: 'Keynote opening by Darlington Akogo setting the theme for AI diagnostics and agricultural tech transformation.',
        speakerName: 'Darlington Akogo',
      },
      {
        time: '10:30 AM - 12:00 PM',
        title: 'Panel Discussion: Ethical AI Alignment & Local Language NLP',
        description: 'Exploring machine learning models for African dialects and data privacy sovereignty.',
        speakerName: 'Jason Hickey & Prof. Olivia Kwapong',
      },
      {
        time: '01:30 PM - 03:30 PM',
        title: 'Hands-on Lab: Deploying Computer Vision Models at Scale',
        description: 'Interactive code lab demonstrating edge AI inference on mobile devices for rural healthcare.',
        speakerName: 'Kayode Akomolafe',
      },
      {
        time: '04:00 PM - 05:30 PM',
        title: 'Deep-Tech Startup Showcase & Investor Networking',
        description: 'Top 10 selected African AI startups demo their products to regional VC funds.',
      },
    ],
    pastEditions: [
      {
        year: '2025 Edition',
        title: 'Pan African AI Summit 2025 (Accra Digital Centre)',
        attendeesCount: '520+ Attendees',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
        summary: 'Gathered 500+ engineers across 8 West African nations. Launched 4 open-source AI datasets for healthcare and local language processing.',
      },
      {
        year: '2024 Edition',
        title: 'Pan African AI Summit 2024 (Legon Innovation Hub)',
        attendeesCount: '380 Attendees',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80',
        summary: 'Inaugural summit focusing on developer education, computer vision workshops, and university research partnerships.',
      },
    ],
    lineup: [
      {
        id: 'spk-1',
        name: 'Darlington Akogo',
        roleTag: 'Headliner',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        title: 'Founder, CEO, minoHealth AI | karaAgro AI',
        bio: 'Founder, CEO, minoHealth AI, karaAgro AI | AI4Radiology Chair, United Nations ITU & WHO Focus Group on AI For Health. Leading pioneers in medical AI diagnostics across West Africa.',
        linkedin: 'https://linkedin.com/in/darlingtonakogo',
        twitter: 'https://twitter.com/darlingtonakogo',
      },
      {
        id: 'spk-2',
        name: 'Jason Hickey',
        roleTag: 'Headliner',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        title: 'Head of Google AI Ghana Lab',
        bio: 'Directing AI research initiatives focused on machine learning models tailored for African languages, weather forecasting, and agricultural remote sensing.',
        linkedin: 'https://linkedin.com/in/jasonhickey',
      },
      {
        id: 'spk-3',
        name: 'Andreas Horn',
        roleTag: 'Headliner',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
        title: 'VP of AI Research, Global Tech Institute',
        bio: 'Leading international research teams exploring neural networks, ethical AI alignment, and automated system verification.',
        twitter: 'https://twitter.com/andreashorn',
      },
      {
        id: 'spk-4',
        name: 'Prof. Olivia A. T. Frimpong Kwapong',
        roleTag: 'Headliner',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        title: 'Dean, School of Continuing and Distance Education',
        bio: 'Leading educational innovation and policy advocacy for inclusive digital transformation and AI integration in higher education across Ghana.',
        linkedin: 'https://linkedin.com/in/oliviakwapong',
      },
      {
        id: 'spk-5',
        name: 'Kayode Akomolafe',
        roleTag: 'Speaker',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
        title: 'Lead Architect, Pan-African AI Fintech Lab',
        bio: 'Architecting scalable deep learning infrastructure and automated credit risk scoring for cross-border African commerce.',
        twitter: 'https://twitter.com/kayodeakom',
      },
    ],
    status: 'published',
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'evt-102',
    ownerId: 'user-organizer-2',
    title: 'Campus Sunset Live Concert & Food Fest',
    description: 'An unforgettable evening featuring high-energy live acoustic sets, DJ performances, craft food trucks, and games under the stars.',
    category: 'Music & Concerts',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    ],
    startAt: '2026-10-20T17:30:00.000Z',
    endAt: '2026-10-20T23:00:00.000Z',
    venue: 'Pentagon Gardens',
    address: 'Pentagon Hostel Lawn, University of Ghana',
    city: 'Accra',
    latitude: 5.6580,
    longitude: -0.1840,
    price: 'GHS 40',
    isFree: false,
    ticketBadge: 'SELLING FAST',
    externalLink: 'https://tickets.nextup.app/sunset-fest',
    contact: '+233 55 987 6543',
    organizer: {
      name: 'Campus Vibes Ent.',
      logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80',
      bio: 'Creating premium live entertainment experiences for campus students and music lovers.',
      type: 'Company',
      contact: 'vibes@campusent.com',
    },
    organizerStats: {
      followers: 850,
      eventsCount: 8,
      hostingCount: 2,
    },
    highlights: {
      duration: '5 hours 30 mins',
      format: 'In person',
      mobileTicket: true,
    },
    refundPolicy: 'Refunds up to 3 days before event',
    lineup: [
      {
        id: 'spk-10',
        name: 'DJ Black',
        roleTag: 'Performer',
        avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
        title: 'Award-winning Radio & Club DJ',
        bio: 'West Africa premier turntablist mixing Afrobeats, Highlife, and global club anthems.',
      },
      {
        id: 'spk-11',
        name: 'Acoustic Soul Ghana',
        roleTag: 'Headliner',
        avatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80',
        title: 'Live Afro-Jazz Fusion Band',
        bio: 'Enchanting live band bringing smooth soul fusion to sunset campus festivals.',
      },
    ],
    status: 'published',
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-103',
    ownerId: 'user-organizer-3',
    title: 'University Career & Internship Expo 2026',
    description: 'Connect directly with top employers in finance, engineering, marketing, and healthcare. Bring your CV for instant interview opportunities.',
    category: 'Career',
    coverImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-02T10:00:00.000Z',
    endAt: '2026-11-02T16:00:00.000Z',
    venue: 'Great Hall Foyer',
    address: 'University of Ghana Main Campus',
    city: 'Accra',
    latitude: 5.6520,
    longitude: -0.1880,
    price: 'Free',
    isFree: true,
    contact: 'careers@ug.edu.gh',
    organizer: {
      name: 'University Placement Office',
      logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&auto=format&fit=crop&q=80',
      bio: 'Empowering students with career guidance, recruitment events, and industry exposure.',
      type: 'Institution',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'evt-104',
    ownerId: 'user-organizer-4',
    title: 'Osu Night Market & Craft Culture Showcase',
    description: 'Explore handmade fashion, art installations, local street food delights, and live drumming performances in the heart of Osu.',
    category: 'Arts & Culture',
    coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-10-24T18:00:00.000Z',
    endAt: '2026-10-24T23:59:00.000Z',
    venue: 'Osu Oxford Street Courtyard',
    address: 'Oxford Street, Osu',
    city: 'Accra',
    latitude: 5.5560,
    longitude: -0.1820,
    price: 'Free',
    isFree: true,
    contact: '+233 20 444 5555',
    organizer: {
      name: 'Accra Creative Guild',
      logo: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200&auto=format&fit=crop&q=80',
      bio: 'Promoting local African artisans, culture, and street art festivals.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-105',
    ownerId: 'user-organizer-5',
    title: 'Afrobeats & Chill Rooftop Party',
    description: 'Unwind with panoramic views of East Legon, signature cocktails, and live DJ sets spinning Afrobeats, Amapiano, and hip-hop.',
    category: 'Parties & Nightlife',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-10-18T20:00:00.000Z',
    endAt: '2026-10-19T03:00:00.000Z',
    venue: 'Skybar 25 Rooftop Lounge',
    address: 'Alto Tower, Airport Residential',
    city: 'Accra',
    latitude: 5.6000,
    longitude: -0.1700,
    price: 'GHS 100',
    isFree: false,
    contact: '+233 50 111 2222',
    organizer: {
      name: 'Skyline Nightlife',
      logo: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?w=200&auto=format&fit=crop&q=80',
      bio: 'Curators of luxury rooftop nightlife and private social mixers.',
      type: 'Company',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-106',
    ownerId: 'user-organizer-6',
    title: 'Legon Inter-Faculty Football Finals 2026',
    description: 'The ultimate rivalry match! Watch the top faculty teams battle for glory on the pitch with live commentary and halftime prizes.',
    category: 'Sports',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-10-28T15:00:00.000Z',
    endAt: '2026-10-28T18:30:00.000Z',
    venue: 'UG Sports Stadium',
    address: 'University of Ghana Sports Complex',
    city: 'Accra',
    latitude: 5.6540,
    longitude: -0.1890,
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'UG Sports Directorate',
      logo: 'https://images.unsplash.com/photo-1517649763962-0c6232662000?w=200&auto=format&fit=crop&q=80',
      bio: 'Fostering athletic excellence, varsity tournaments, and health on campus.',
      type: 'Institution',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 6,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'evt-107',
    ownerId: 'user-organizer-7',
    title: 'Future Founders & Angel Pitch Night',
    description: 'Early-stage tech startups pitch live to angel investors, venture capitalists, and industry mentors. Networking drinks provided.',
    category: 'Business',
    coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-05T17:00:00.000Z',
    endAt: '2026-11-05T21:00:00.000Z',
    venue: 'Meltwater Entrepreneurial School (MEST)',
    address: 'East Legon, 19 Banana St',
    city: 'Accra',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'MEST Africa',
      logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80',
      bio: 'Pan-African tech entrepreneur training program and seed fund.',
      type: 'Company',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 8,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'evt-108',
    ownerId: 'user-organizer-8',
    title: 'Mindful Yoga & Sunrise Beach Wellness Session',
    description: 'Start your weekend with guided meditation, Vinyasa yoga flow, sound bowl healing, and fresh coconut water by the ocean breeze.',
    category: 'Health & Wellness',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-10-31T06:30:00.000Z',
    endAt: '2026-10-31T09:00:00.000Z',
    venue: 'Labadi Beach Resort Lawn',
    address: 'Labadi Beach Road',
    city: 'Accra',
    price: 'GHS 50',
    isFree: false,
    organizer: {
      name: 'Zen Pulse Accra',
      logo: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200&auto=format&fit=crop&q=80',
      bio: 'Holistic wellness community organizing outdoor yoga and mindfulness retreats.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-109',
    ownerId: 'user-organizer-9',
    title: 'West Africa Cyber Security Hackathon',
    description: 'A 24-hour competitive hackathon testing ethical hacking, network defense, and web app vulnerability discovery. Cash prizes for winners!',
    category: 'Technology',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-12T08:00:00.000Z',
    endAt: '2026-11-13T12:00:00.000Z',
    venue: 'Kofi Annan ICT Center',
    address: 'Ridge, Castle Road',
    city: 'Accra',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'CyberDefend GH',
      logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&auto=format&fit=crop&q=80',
      bio: 'Dedicated to strengthening digital security talent and threat intelligence across Africa.',
      type: 'Company',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 9,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'evt-110',
    ownerId: 'user-organizer-10',
    title: 'Campus Praise Night & Worship Experience',
    description: 'An uplifting night of praise, live choir worship, inspirational messages, and community fellowship.',
    category: 'Religion',
    coverImage: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-08T18:00:00.000Z',
    endAt: '2026-11-08T22:00:00.000Z',
    venue: 'Legon Central Cafeteria Auditorium',
    address: 'University of Ghana Main Campus',
    city: 'Accra',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'Campus Christian Fellowship',
      logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      bio: 'Inter-denominational student fellowship for spiritual growth and community.',
      type: 'Student group',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'evt-111',
    ownerId: 'user-organizer-11',
    title: 'Accra Independent Film Festival & Director Q&A',
    description: 'Screening 10 original short films by emerging West African directors, followed by live Q&A panels and a red carpet mixer.',
    category: 'Arts & Culture',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-15T16:00:00.000Z',
    endAt: '2026-11-15T22:00:00.000Z',
    venue: 'Silverbird Cinemas',
    address: 'Accra Mall, Tetteh Quarshie Interchange',
    city: 'Accra',
    price: 'GHS 60',
    isFree: false,
    organizer: {
      name: 'Black Star Cinema Club',
      logo: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=200&auto=format&fit=crop&q=80',
      bio: 'Showcasing authentic African cinema storytelling and film production mastery.',
      type: 'Company',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-112',
    ownerId: 'user-organizer-12',
    title: 'Public Speaking & Executive Leadership Masterclass',
    description: 'Master stage presence, pitch storytelling, dynamic voice control, and executive confidence with renowned speech coaches.',
    category: 'Education',
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-20T10:00:00.000Z',
    endAt: '2026-11-20T15:00:00.000Z',
    venue: 'Kempinski Hotel Gold Coast City',
    address: 'Gamel Abdul Nasser Avenue',
    city: 'Accra',
    price: 'GHS 150',
    isFree: false,
    organizer: {
      name: 'SpeakRight Institute',
      logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      bio: 'Executive communications training firm for leaders, CEOs, and ambitious professionals.',
      type: 'Company',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 10,
    updatedAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'evt-113',
    ownerId: 'user-organizer-13',
    title: 'KNUST Tech Innovators Demo Day 2026',
    description: 'Student engineering teams and tech startups from KNUST present hardware prototypes, IoT devices, and web applications to industry judges.',
    category: 'Technology',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-10-22T09:00:00.000Z',
    endAt: '2026-10-22T17:00:00.000Z',
    venue: 'Great Hall Auditorium, KNUST',
    address: 'KNUST Campus',
    city: 'Kumasi',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'KNUST Innovation Hub',
      logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&auto=format&fit=crop&q=80',
      bio: 'Fostering engineering innovation, robotics labs, and student ventures in Kumasi.',
      type: 'Institution',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-114',
    ownerId: 'user-organizer-14',
    title: 'Chale Wote Street Art & Mural Festival',
    description: 'An open-air festival bringing together street painters, graffiti artists, performance art, drumming circles, and indie music.',
    category: 'Arts & Culture',
    coverImage: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-10-25T11:00:00.000Z',
    endAt: '2026-10-26T22:00:00.000Z',
    venue: 'Jamestown High Street',
    address: 'Ussher Fort Promenade',
    city: 'Accra',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'ACCRA [ALT] Radio & Culture',
      logo: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200&auto=format&fit=crop&q=80',
      bio: 'Independent art collective and producers of Chale Wote Street Art Festival.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 8,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'evt-115',
    ownerId: 'user-organizer-15',
    title: 'Ghana Web3 & Crypto Developers Conference',
    description: 'Exploring smart contract development, decentralized finance protocols, and blockchain adoption across West Africa.',
    category: 'Technology',
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-10T09:30:00.000Z',
    endAt: '2026-11-10T17:30:00.000Z',
    venue: 'Accra International Conference Centre',
    address: 'Castle Road, Ridge',
    city: 'Accra',
    price: 'GHS 80',
    isFree: false,
    organizer: {
      name: 'Web3 Ghana Builders',
      logo: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=200&auto=format&fit=crop&q=80',
      bio: 'Community of blockchain engineers, Smart Contract developers, and DeFi founders.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 6,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-116',
    ownerId: 'user-organizer-16',
    title: 'Highlife & Afro-Jazz Heritage Night',
    description: 'Savor live acoustic Highlife guitar rhythms, brass sections, and smooth Afro-Jazz fusion performed by veteran and youth legends.',
    category: 'Music & Concerts',
    coverImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-10-30T19:30:00.000Z',
    endAt: '2026-10-30T23:30:00.000Z',
    venue: '+233 Jazz Bar & Grill',
    address: 'Ring Road Central',
    city: 'Accra',
    price: 'GHS 50',
    isFree: false,
    organizer: {
      name: '+233 Live Club',
      logo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&auto=format&fit=crop&q=80',
      bio: 'Accra premier live music venue showcasing African jazz, highlife, and soul.',
      type: 'Company',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-117',
    ownerId: 'user-organizer-17',
    title: 'West Africa E-Commerce & Logistics Expo',
    description: 'Learn latest strategies in cross-border payments, last-mile delivery tech, and inventory management for online merchants.',
    category: 'Business',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-18T09:00:00.000Z',
    endAt: '2026-11-18T16:00:00.000Z',
    venue: 'Tema Community Centre Auditorium',
    address: 'Community 1, Main Road',
    city: 'Tema',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'TradeNext West Africa',
      logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&auto=format&fit=crop&q=80',
      bio: 'Connecting logistics hubs, payment gateways, and retail entrepreneurs.',
      type: 'Company',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'evt-118',
    ownerId: 'user-organizer-18',
    title: 'University Health Fair & Blood Donation Rally',
    description: 'Free health screenings, eye tests, blood pressure checks, and voluntary blood donation drive organized by medical students.',
    category: 'Community',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-10-21T08:30:00.000Z',
    endAt: '2026-10-21T15:30:00.000Z',
    venue: 'UG Legon Night Market Square',
    address: 'University of Ghana Campus',
    city: 'Legon',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'UG Medical Students Association',
      logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=200&auto=format&fit=crop&q=80',
      bio: 'Promoting community health outreach, medical screening, and blood donation.',
      type: 'Student group',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-119',
    ownerId: 'user-organizer-19',
    title: 'Cape Coast Castle Cultural Heritage Tour',
    description: 'Guided historical walk through Cape Coast Castle dungeons, heritage talks, and traditional drumming performances by local youth.',
    category: 'Arts & Culture',
    coverImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-01T10:00:00.000Z',
    endAt: '2026-11-01T14:00:00.000Z',
    venue: 'Cape Coast Castle Courtyard',
    address: 'Victoria Road',
    city: 'Cape Coast',
    price: 'GHS 30',
    isFree: false,
    organizer: {
      name: 'Central Heritage Guild',
      logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=80',
      bio: 'Preserving West African historical sites and organizing educational tours.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 9,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'evt-120',
    ownerId: 'user-organizer-20',
    title: 'Campus Afro-Amapiano Rave',
    description: 'High energy outdoor party featuring top campus DJs, laser light shows, body paint stations, and food trucks.',
    category: 'Parties & Nightlife',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-10-23T21:00:00.000Z',
    endAt: '2026-10-24T04:00:00.000Z',
    venue: 'Sarbah Hall Main Lawn',
    address: 'University of Ghana Main Campus',
    city: 'Legon',
    price: 'GHS 25',
    isFree: false,
    organizer: {
      name: 'Legon Party Central',
      logo: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&auto=format&fit=crop&q=80',
      bio: 'Campus event planners specializing in student nightlife and music festivals.',
      type: 'Student group',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-121',
    ownerId: 'user-organizer-21',
    title: 'Women in STEM & Tech Leadership Forum',
    description: 'Inspirational keynotes and mentorship circles connecting female software engineers, scientists, and founders across Ghana.',
    category: 'Education',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-14T10:00:00.000Z',
    endAt: '2026-11-14T15:00:00.000Z',
    venue: 'Accra Digital Centre',
    address: 'Ring Road West',
    city: 'Accra',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'WomenTech Ghana',
      logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      bio: 'Empowering African women and girls with STEM education and tech leadership.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 6,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'evt-122',
    ownerId: 'user-organizer-22',
    title: 'Accra City 10K Charity Marathon',
    description: 'Lace up your running shoes! Run or walk along the coastal road to support local youth education initiatives.',
    category: 'Sports',
    coverImage: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-07T06:00:00.000Z',
    endAt: '2026-11-07T10:00:00.000Z',
    venue: 'Independence Square Park',
    address: 'Black Star Square',
    city: 'Accra',
    price: 'GHS 20',
    isFree: false,
    organizer: {
      name: 'Accra Runners Club',
      logo: 'https://images.unsplash.com/photo-1517649763962-0c6232662000?w=200&auto=format&fit=crop&q=80',
      bio: 'Promoting marathon running, fitness, and health across Greater Accra.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 8,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'evt-123',
    ownerId: 'user-organizer-23',
    title: 'Eco-Green Beach Cleanup & Recycling Fair',
    description: 'Join environmental advocates for a morning beach cleanup at Laboma Beach followed by upcycling workshops and eco-vendor stalls.',
    category: 'Community',
    coverImage: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-10-17T07:00:00.000Z',
    endAt: '2026-10-17T12:00:00.000Z',
    venue: 'Laboma Beach Park',
    address: 'Laboma Beach Road',
    city: 'Accra',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'Green Earth Ghana',
      logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&auto=format&fit=crop&q=80',
      bio: 'Youth-led NGO focused on ocean conservation, plastic recycling, and climate action.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-124',
    ownerId: 'user-organizer-24',
    title: 'West African Real Estate Investment Summit',
    description: 'A premium gathering of property developers, architectural firms, mortgage banks, and private equity investors.',
    category: 'Business',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-25T09:00:00.000Z',
    endAt: '2026-11-25T17:00:00.000Z',
    venue: 'Mövenpick Ambassador Hotel',
    address: 'Independence Avenue',
    city: 'Accra',
    price: 'GHS 200',
    isFree: false,
    organizer: {
      name: 'PropTech & Real Estate GH',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&auto=format&fit=crop&q=80',
      bio: 'Leading real estate intelligence network and property summit organizers.',
      type: 'Company',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 12,
    updatedAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'evt-125',
    ownerId: 'user-organizer-25',
    title: 'Ghana National Theatre Drama Special',
    description: 'Watch the theatrical stage performance of classic Ghanaian literature accompanied by live traditional orchestra.',
    category: 'Arts & Culture',
    coverImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-10-29T18:30:00.000Z',
    endAt: '2026-10-29T21:30:00.000Z',
    venue: 'National Theatre of Ghana',
    address: 'South Liberia Road, Victoriaborg',
    city: 'Accra',
    price: 'GHS 45',
    isFree: false,
    organizer: {
      name: 'National Drama Company',
      logo: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200&auto=format&fit=crop&q=80',
      bio: 'Official resident theatrical company of the National Theatre.',
      type: 'Institution',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-126',
    ownerId: 'user-organizer-26',
    title: 'DevFest West Africa Code & Cloud Summit',
    description: 'Community-led developer conference covering Google Cloud Platform, Flutter, Android, AI APIs, and DevOps architecture.',
    category: 'Technology',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-28T08:30:00.000Z',
    endAt: '2026-11-28T17:00:00.000Z',
    venue: 'Legon Hall Complex Auditorium',
    address: 'University of Ghana Main Campus',
    city: 'Legon',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'Google Developer Group Accra',
      logo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&auto=format&fit=crop&q=80',
      bio: 'Developer community exploring web development, cloud computing, and AI.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 10,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'evt-127',
    ownerId: 'user-organizer-27',
    title: 'Gospel Praise Jubilee & Choral Night',
    description: 'An evening of classical choral hymns, gospel choir harmonies, and live instrumental worship in Kumasi.',
    category: 'Religion',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-06T18:00:00.000Z',
    endAt: '2026-11-06T22:00:00.000Z',
    venue: 'KNUST Royal Parade Grounds',
    address: 'KNUST Campus',
    city: 'Kumasi',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'Kumasi Youth Mass Choir',
      logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      bio: 'Inter-denominational gospel choral group promoting unity through praise.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'evt-128',
    ownerId: 'user-organizer-28',
    title: 'Campus E-Sports & Gaming Championship',
    description: 'Competitive tournaments in EA FC 26, Tekken, Mortal Kombat, and Valorant with live caster commentary and cash prize pool.',
    category: 'Sports',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-10-31T12:00:00.000Z',
    endAt: '2026-10-31T20:00:00.000Z',
    venue: 'UG Student Union Lounge',
    address: 'University of Ghana Main Campus',
    city: 'Legon',
    price: 'GHS 15',
    isFree: false,
    organizer: {
      name: 'Ghana Cyber Gamers Club',
      logo: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&auto=format&fit=crop&q=80',
      bio: 'Organizing competitive esports tournaments and gaming conventions across universities.',
      type: 'Student group',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-129',
    ownerId: 'user-organizer-29',
    title: 'Startup Founders Breakfast & VC Pitch',
    description: 'An intimate morning coffee roundtable where pre-seed founders pitch to angel investors and get direct feedback on unit economics.',
    category: 'Business',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-04T08:00:00.000Z',
    endAt: '2026-11-04T10:30:00.000Z',
    venue: 'Impact Hub Accra',
    address: 'F71/6 Otswe Street, Osu',
    city: 'Accra',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'Accra Founder Network',
      logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80',
      bio: 'Peer networking group for tech founders, product managers, and early investors.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'evt-130',
    ownerId: 'user-organizer-30',
    title: 'Accra Street Food & Jollof Battle 2026',
    description: 'The ultimate culinary showdown! Taste Ghanaian Jollof, Suya kebabs, Kelewele, and local craft drinks while voting for the champion chef.',
    category: 'Community',
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-14T12:00:00.000Z',
    endAt: '2026-11-14T20:00:00.000Z',
    venue: 'Efua Sutherland Children’s Park',
    address: 'Castle Road',
    city: 'Accra',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'Taste of Ghana Culinary Society',
      logo: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=200&auto=format&fit=crop&q=80',
      bio: 'Celebrating authentic West African gastronomy, street food, and culinary talent.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 6,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'evt-131',
    ownerId: 'user-organizer-31',
    title: 'Mind & Body Mental Health Symposium',
    description: 'Expert talks on managing stress, university burnout, mindfulness practices, and accessible mental health support systems.',
    category: 'Health & Wellness',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-19T14:00:00.000Z',
    endAt: '2026-11-19T17:30:00.000Z',
    venue: 'UG Balme Library Seminar Room',
    address: 'University of Ghana Main Campus',
    city: 'Legon',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'Wellness Alliance Ghana',
      logo: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200&auto=format&fit=crop&q=80',
      bio: 'Advocating for mental health awareness and wellness support in universities.',
      type: 'Community',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'evt-132',
    ownerId: 'user-organizer-32',
    title: 'Fashion Week Accra & Emerging Designers',
    description: 'A high-fashion runway showcase featuring eco-friendly African textiles, avant-garde couture, and street style accessories.',
    category: 'Arts & Culture',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-21T17:00:00.000Z',
    endAt: '2026-11-21T22:00:00.000Z',
    venue: 'Mövenpick Grand Ballroom',
    address: 'Independence Avenue',
    city: 'Accra',
    price: 'GHS 120',
    isFree: false,
    organizer: {
      name: 'Accra Fashion Council',
      logo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&auto=format&fit=crop&q=80',
      bio: 'Promoting contemporary African fashion design, sustainable textiles, and runway events.',
      type: 'Company',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 9,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'evt-133',
    ownerId: 'user-organizer-33',
    title: 'Remote Work & Freelancer Expo',
    description: 'Discover global remote jobs, international payment setups, co-working spaces, and portfolio presentation skills for African creatives.',
    category: 'Career',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-11T11:00:00.000Z',
    endAt: '2026-11-11T16:00:00.000Z',
    venue: 'BaseCamp Initiative Hub',
    address: 'East Legon, Boundary Road',
    city: 'Accra',
    price: 'Free',
    isFree: true,
    organizer: {
      name: 'Remote Africa Network',
      logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&auto=format&fit=crop&q=80',
      bio: 'Connecting African talent with global remote employment opportunities.',
      type: 'Company',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-134',
    ownerId: 'user-organizer-34',
    title: 'Silent Disco & Beach Party',
    description: 'Switch between 3 wireless headphone channels featuring DJ Afrobeats, Amapiano, and Old School Hip-Hop right on the ocean shoreline.',
    category: 'Parties & Nightlife',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-11-07T20:00:00.000Z',
    endAt: '2026-11-08T03:00:00.000Z',
    venue: 'Kokrobitey Beach Club',
    address: 'Kokrobitey Coast',
    city: 'Accra',
    price: 'GHS 70',
    isFree: false,
    organizer: {
      name: 'Silent Wave Entertainment',
      logo: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?w=200&auto=format&fit=crop&q=80',
      bio: 'Pioneers in silent headphone parties and beach rave experiences.',
      type: 'Company',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'evt-135',
    ownerId: 'user-organizer-35',
    title: 'University Alumni Gala & Fundraiser',
    description: 'An elegant black-tie evening reuniting alumni, featuring live orchestra, dinner, and fundraising for campus library expansion.',
    category: 'Community',
    coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80',
    startAt: '2026-12-05T18:30:00.000Z',
    endAt: '2026-12-05T23:00:00.000Z',
    venue: 'Great Hall Lawn, University of Ghana',
    address: 'Legon Campus',
    city: 'Legon',
    price: 'GHS 180',
    isFree: false,
    organizer: {
      name: 'UG Alumni Secretariat',
      logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&auto=format&fit=crop&q=80',
      bio: 'Connecting alumni worldwide and supporting university development projects.',
      type: 'Institution',
    },
    status: 'published',
    createdAt: Date.now() - 86400000 * 14,
    updatedAt: Date.now() - 86400000 * 5,
  },
];

const INITIAL_VENDORS: VendorProfileModel[] = [
  {
    id: 'ven-101',
    ownerId: 'user-vendor-1',
    name: 'SoundWave Audio & Lighting Systems',
    logo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80',
    description: 'Professional high-definition sound reinforcement, stage lighting setup, wireless mics, and sound engineers for concerts, conferences, and weddings.',
    categories: ['Sound', 'Lighting', 'Equipment Rental'],
    businessRegistrationNumber: 'CS-984210026',
    taxIdNumber: 'C001294819X',
    experienceYears: 8,
    teamSize: '14 Certified Technicians & Crew',
    completedEventsCount: 240,
    rating: 4.9,
    reviewsCount: 48,
    businessHours: 'Mon – Sat: 8:00 AM – 9:00 PM (24/7 Event On-Call Support)',
    paymentTerms: '50% deposit upon booking confirmation. Balance due 24 hours prior to event setup. Mobile Money & Bank Transfer accepted.',
    services: [
      { title: 'Concert Sound Package (Up to 1000 pax)', priceRange: 'GHS 2,500 - 5,000', description: 'Full line array system, digital mixer, sound engineer, and stage monitors.', setupIncluded: true, turnaroundTime: '3 Hours Setup', equipmentIncluded: ['Line Array Tops', 'Dual 18" Subwoofers', 'Allen & Heath Digital Desk'] },
      { title: 'Conference & Seminar Audio', priceRange: 'GHS 1,200', description: 'Crisp speech amplification, lapel mics, and recording setup.', setupIncluded: true, turnaroundTime: '1.5 Hours Setup', equipmentIncluded: ['RCF Active Speakers', '4x UHF Lapel Mics'] },
    ],
    pricingPackages: [
      {
        name: 'Bronze Seminar Package',
        price: 'GHS 1,500',
        billingCycle: 'Per Day',
        description: 'Ideal for indoor seminars, workshops, and corporate training up to 150 guests.',
        features: [
          '2x RCF Active PA Speakers',
          '4x UHF Wireless Lapel/Handheld Mics',
          '12-Channel Digital Mixing Console',
          '1x On-site Sound Engineer',
        ],
        deliverables: 'Speech clarity guarantee & MP3 audio recording export',
      },
      {
        name: 'Silver Concert & Gala Package',
        price: 'GHS 3,500',
        popular: true,
        billingCycle: 'Per Day',
        description: 'High-power sound system with Intelligent LED stage lighting for medium concerts & galas up to 600 guests.',
        features: [
          '4x Line Array Top Speakers + 2x Dual 18" Subwoofers',
          '6x Wireless UHF Mics & Stage Monitors',
          '16x Moving Head & Par LED Stage Lights',
          '2x Senior Sound & Lighting Engineers',
        ],
        deliverables: 'Full live multi-track audio recording & lighting choreography',
      },
      {
        name: 'Gold Festival & Outdoor VIP Package',
        price: 'GHS 7,500',
        billingCycle: 'Per Day',
        description: 'Stadium & festival grade sound rig with hydraulic trussing and beam lighting.',
        features: [
          '8x Line Array Modules + 4x Ground Subwoofers',
          'Digital Snake & 32-Channel Allen & Heath Desk',
          'Complete Intelligent Truss Lighting Rig & Fog Machine',
          'Dedicated 4-man Technical Crew & Backup Generator',
        ],
        deliverables: 'Uninterrupted festival sound guarantee & live broadcast audio feed',
      },
    ],
    certificates: [
      {
        title: "RGD Certificate of Incorporation",
        certNumber: "CS-984210026",
        issuingAuthority: "Registrar General's Dept Ghana",
        issueDate: "2018-04-12",
        fileUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
        status: "verified",
      },
      {
        title: "GRA Tax Clearance Certificate",
        certNumber: "TIN-C001294819X",
        issuingAuthority: "Ghana Revenue Authority",
        issueDate: "2026-01-10",
        fileUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80",
        status: "verified",
      },
    ],
    mediaFiles: [
      {
        type: "video",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        title: "Live Concert Sound Setup & Soundcheck",
        caption: "Pan-African Music Fest Stage Production",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80",
        title: "Intelligent LED Lighting Rig",
        caption: "Kempinski Ballroom Gala Night",
      },
    ],
    faqs: [
      {
        question: "Do you supply power generators if the venue loses electricity?",
        answer: "Yes! All our Silver and Gold packages include automatic generator power backups to ensure uninterrupted events.",
      },
      {
        question: "How early does your crew arrive for setup?",
        answer: "We arrive at least 3 hours prior to event doors opening to perform full acoustic checks and line testing.",
      },
    ],
    testimonials: [
      {
        clientName: "Kwame Osei (Pan African Summit)",
        eventTitle: "AI & Tech Summit 2025",
        rating: 5,
        comment: "SoundWave provided crystal clear sound for over 800 delegates. Flawless execution and super professional crew!",
        date: "Nov 2025",
      },
    ],
    location: 'Legon Road, East Legon',
    city: 'Accra',
    serviceArea: 'Accra, Tema, Kumasi',
    latitude: 5.6400,
    longitude: -0.1600,
    contact: {
      phone: '+233 24 888 7777',
      whatsapp: '+233248887777',
      email: 'booking@soundwavegh.com',
      instagram: '@soundwave_gh',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    ],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 10,
  },
  {
    id: 'ven-102',
    ownerId: 'user-vendor-2',
    name: 'Savory Delights Catering & Grill',
    logo: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&auto=format&fit=crop&q=80',
    description: 'Authentic Ghanaian and continental gourmet buffet catering, cocktail finger foods, barbecue stations, and custom event dining.',
    categories: ['Catering / Food'],
    services: [
      { title: 'Full Buffet Catering per Head', priceRange: 'GHS 60 / person', description: 'Jollof, fried rice, grilled chicken/fish, salads, and dessert table.' },
      { title: 'VIP Cocktail & Hors d’oeuvres', priceRange: 'GHS 45 / person', description: 'Finger foods, sliders, spring rolls, and fresh mocktail bar.' },
    ],
    pricingPackages: [
      {
        name: 'Starter Banquet',
        price: 'GHS 45',
        billingCycle: 'Per Person',
        description: 'For cocktail receptions, corporate networking, and finger food events.',
        features: [
          'Choice of 5 gourmet sliders & finger foods',
          'Fresh mocktail bar station',
          'Professional uniformed servers',
          'Setup & chaffing dish presentation',
        ],
        deliverables: 'Complete cocktail food station setup',
      },
      {
        name: 'Pro Buffet Package',
        price: 'GHS 65',
        popular: true,
        billingCycle: 'Per Person',
        description: 'Full Ghanaian & Continental buffet feast for galas, conferences, & weddings.',
        features: [
          'Jollof rice, fried rice & banku station',
          'Grilled chicken, tilapia & beef kebabs',
          'Salad bar & fried plantain',
          'Complimentary fruit carving display',
        ],
        deliverables: 'Full buffet dining setup with server staff',
      },
      {
        name: 'Expert Royal Feast',
        price: 'GHS 95',
        billingCycle: 'Per Person',
        description: 'Luxury VIP multi-course experience with live grill chef & dessert bar.',
        features: [
          'Live charcoal barbecue & seafood station',
          'Red velvet & chocolate dessert fountain',
          'Dedicated table service staff',
          'Custom menu printing & table decor',
        ],
        deliverables: 'VIP white-glove catering service',
      },
    ],
    testimonials: [
      {
        clientName: "Sarah Mensah (CEO @ Horizon)",
        eventTitle: "Annual Corporate Gala 2025",
        rating: 5,
        comment: "Savory Delights catered for 300 guests with flawless taste and presentation. Highly recommended!",
        date: "Dec 2025",
      },
    ],
    location: 'Airport Residential Area',
    city: 'Accra',
    serviceArea: 'Greater Accra Region',
    latitude: 5.6000,
    longitude: -0.1700,
    contact: {
      phone: '+233 20 111 2233',
      whatsapp: '+233201112233',
      email: 'events@savorydelights.com',
      instagram: '@savorydelights_catering',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    ],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 8,
  },
  {
    id: 'ven-103',
    ownerId: 'user-vendor-3',
    name: 'Luminary Studios Photography & Video',
    logo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=80',
    description: 'Cinematic event coverage, 4K highlight reels, live streaming, and high-resolution event photography with fast same-day delivery.',
    categories: ['Photography', 'Videography'],
    services: [
      { title: 'Full Event Photography Coverage', priceRange: 'GHS 1,500', description: 'Unlimited edited digital photos, online private gallery, fast delivery.' },
      { title: '4K Cinematic Aftermovie (3-5 min)', priceRange: 'GHS 2,200', description: 'Drone footage, color grading, licensed soundtrack.' },
    ],
    pricingPackages: [
      {
        name: 'Starter Lens',
        price: 'GHS 1,500',
        billingCycle: 'Per Day',
        description: 'For solo creators, corporate seminars, and private parties.',
        features: [
          '1x Senior Event Photographer',
          'Unlimited edited high-resolution photos',
          'Private online gallery link',
          'Fast 48-hour digital delivery',
        ],
        deliverables: 'Edited photo gallery export',
      },
      {
        name: 'Pro Cinema',
        price: 'GHS 3,500',
        popular: true,
        billingCycle: 'Per Day',
        description: 'Complete photo & video coverage for major conferences and weddings.',
        features: [
          '2x Photographers + 1x Videographer',
          '4K Cinematic Highlight Film (3-5 mins)',
          'Licensed audio soundtrack & drone aerials',
          'Same-day sneak peek 20 photos',
        ],
        deliverables: '4K Highlight Reel & full photo album',
      },
      {
        name: 'Expert Media Suite',
        price: 'GHS 6,500',
        billingCycle: 'Per Day',
        description: 'Full festival broadcast, 4K multi-cam live stream, and drone squad.',
        features: [
          '3x 4K Camera Crew + 1x Licensed Drone Pilot',
          'YouTube / Facebook 4K Live Stream Setup',
          'Same-day 60-sec social reel edit',
          'Complete raw video footage hard drive',
        ],
        deliverables: 'Multi-cam broadcast stream & master video drive',
      },
    ],
    testimonials: [
      {
        clientName: "Ben Foster (CEO @ Company)",
        eventTitle: "Ghana Developer Fest 2026",
        rating: 5,
        comment: "This is truly the perfect plan for me and my team. I would recommend Luminary Studios to anyone looking to move forward quickly.",
        date: "Jan 2026",
      },
    ],
    location: 'Osu RE',
    city: 'Accra',
    serviceArea: 'Nationwide',
    contact: {
      phone: '+233 54 999 1234',
      whatsapp: '+233549991234',
      email: 'info@luminarygh.com',
      instagram: '@luminary_studios',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    ],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: 'ven-104',
    ownerId: 'user-vendor-4',
    name: 'MC Kojo & High Voltage Hosts',
    logo: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&auto=format&fit=crop&q=80',
    description: 'Charismatic, charismatic corporate event MCs, wedding hosts, and concert hype masters with flawless stage presence.',
    categories: ['MC / Host'],
    services: [
      { title: 'Corporate Gala / Conference Hosting', priceRange: 'GHS 1,800', description: 'Program flow control, speaker introductions, and audience engagement.' },
      { title: 'Concert & Festival Hype Hosting', priceRange: 'GHS 2,500', description: 'Stage crowd activation, artist intros, and energy control.' },
    ],
    location: 'Cantonments',
    city: 'Accra',
    serviceArea: 'Accra & Kumasi',
    contact: {
      phone: '+233 24 555 0000',
      whatsapp: '+233245550000',
      email: 'kojo@mchosts.com',
      instagram: '@mckojo_official',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
    ],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'ven-105',
    ownerId: 'user-vendor-5',
    name: 'DJ Spin Master & Party Vibes GH',
    logo: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?w=400&auto=format&fit=crop&q=80',
    description: 'Award-winning celebrity DJ equipped with Pioneer DJ decks, custom remix edits, and seamless song mixing across Afrobeats, Amapiano, and Pop.',
    categories: ['DJ'],
    services: [
      { title: 'Party & Concert DJ Set (4 Hours)', priceRange: 'GHS 2,000', description: 'Includes custom playlist, DJ console setup, and live mixing.' },
    ],
    location: 'Spintex Road',
    city: 'Accra',
    serviceArea: 'Greater Accra',
    contact: {
      phone: '+233 27 333 4444',
      whatsapp: '+233273334444',
      instagram: '@djspinmaster_gh',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    ],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: 'ven-106',
    ownerId: 'user-vendor-6',
    name: 'Elegance Luxury Decor & Stage Styling',
    logo: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=80',
    description: 'Bespoke event floral design, luxury backdrop installations, mood lighting accents, and table settings for banquets, galas, and weddings.',
    categories: ['Decoration', 'Event Planning'],
    services: [
      { title: 'Full Venue Decor Package', priceRange: 'GHS 3,500 - 8,000', description: 'Stage backdrop, floral arches, table centerpieces, and aisle runner.' },
    ],
    location: 'Labone',
    city: 'Accra',
    serviceArea: 'Nationwide',
    contact: {
      phone: '+233 20 777 9999',
      whatsapp: '+233207779999',
      email: 'design@elegancedecor.com',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
    ],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 9,
  },
  {
    id: 'ven-107',
    ownerId: 'user-vendor-7',
    name: 'Crown Protocol Ushers & Security Services',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80',
    description: 'Trained, smartly attired event protocol ushers, guest registration managers, and discreet bouncers for seamless guest flow.',
    categories: ['Ushers', 'Security'],
    services: [
      { title: 'Protocol Ushering (Per Usher)', priceRange: 'GHS 150 / day', description: 'Professional seating management, guest greeting, and badge handling.' },
    ],
    location: 'Dzorwulu',
    city: 'Accra',
    serviceArea: 'Accra & Tema',
    contact: {
      phone: '+233 24 666 8888',
      whatsapp: '+233246668888',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    ],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'ven-108',
    ownerId: 'user-vendor-8',
    name: 'Grand Canopy & Equipment Rentals',
    logo: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=80',
    description: 'High-quality marquee tents, air-conditioned dome structures, Chiavari chairs, banquet tables, and portable generators.',
    categories: ['Equipment Rental', 'Venue'],
    services: [
      { title: '100-Seater Marquee Tent & Chairs', priceRange: 'GHS 1,800', description: 'Includes delivery, setup, and dismantling.' },
    ],
    location: 'Madina Zongo Junction',
    city: 'Accra',
    serviceArea: 'Accra, Aburi, Koforidua',
    contact: {
      phone: '+233 26 123 9999',
      whatsapp: '+233261239999',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    ],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 11,
  },
  {
    id: 'ven-109',
    ownerId: 'user-vendor-9',
    name: 'Prime Brand Printers & Banner FX',
    logo: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=400&auto=format&fit=crop&q=80',
    description: 'Same-day large format printing, pull-up banners, event wristbands, custom backdrop vinyls, and branded promotional merchandise.',
    categories: ['Printing / Branding'],
    services: [
      { title: 'Roll-up Banner & Stand (2x1m)', priceRange: 'GHS 250', description: 'High-res vinyl print with aluminum retractable stand.' },
    ],
    location: 'Kokomlemle',
    city: 'Accra',
    serviceArea: 'Accra Central',
    contact: {
      phone: '+233 55 444 3322',
      whatsapp: '+233554443322',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=800&auto=format&fit=crop&q=80',
    ],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'ven-110',
    ownerId: 'user-vendor-10',
    name: 'Velocity Chauffeurs & Shuttle Transport',
    logo: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80',
    description: 'Executive Mercedes SUVs, luxury Sprinter buses, and guest shuttle fleet for VIP transport, airport pickups, and event shuttles.',
    categories: ['Transport'],
    services: [
      { title: 'VIP SUV Chauffeur Service (Full Day)', priceRange: 'GHS 1,200', description: 'Includes uniform driver, fuel, and air-conditioned vehicle.' },
    ],
    location: 'Airport City',
    city: 'Accra',
    serviceArea: 'Nationwide',
    contact: {
      phone: '+233 24 111 9988',
      whatsapp: '+233241119988',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
    ],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 12,
  },
  {
    id: 'ven-111',
    ownerId: 'user-vendor-11',
    name: 'Celestial Event Planners & Coordinators',
    logo: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&auto=format&fit=crop&q=80',
    description: 'Full-service event production management, timeline coordination, vendor sourcing, and day-of execution for corporate & private galas.',
    categories: ['Event Planning'],
    services: [
      { title: 'Full Event Production Management', priceRange: 'GHS 4,000', description: 'End-to-end event conceptualization, budgeting, vendor oversight, and live management.' },
    ],
    location: 'East Legon Hills',
    city: 'Accra',
    serviceArea: 'Accra & Kumasi',
    contact: {
      phone: '+233 50 888 2211',
      whatsapp: '+233508882211',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80',
    ],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 15,
  },
  {
    id: 'ven-112',
    ownerId: 'user-vendor-12',
    name: 'Golden Feast Bakery & Custom Event Cakes',
    logo: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=400&auto=format&fit=crop&q=80',
    description: 'Spectacular multi-tier wedding & celebration cakes, dessert tables, gourmet cupcakes, and customized party pastry favors.',
    categories: ['Catering / Food'],
    services: [
      { title: '3-Tier Custom Celebration Cake', priceRange: 'GHS 1,500', description: 'Choice of red velvet, vanilla bean, or chocolate fudge with luxury fondant design.' },
    ],
    location: 'Roman Ridge',
    city: 'Accra',
    serviceArea: 'Greater Accra',
    contact: {
      phone: '+233 24 333 7777',
      whatsapp: '+233243337777',
    },
    portfolio: [
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
    ],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: 'ven-113',
    ownerId: 'user-vendor-13',
    name: 'Royal Stage & Trussing Solutions',
    logo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80',
    description: 'Heavy duty aluminium stage trusses, LED screens, hydraulic outdoor stages, and ground support systems for major festivals.',
    categories: ['Equipment Rental', 'Sound'],
    services: [
      { title: 'Concert Hydraulic Stage Rental', priceRange: 'GHS 4,500', description: 'Full 10x8m outdoor elevated stage structure with roof.' }
    ],
    location: 'KNUST Road',
    city: 'Kumasi',
    serviceArea: 'Ashanti & Northern Region',
    contact: { phone: '+233 24 999 0011', whatsapp: '+233249990011' },
    portfolio: ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80'],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 14,
  },
  {
    id: 'ven-114',
    ownerId: 'user-vendor-14',
    name: 'Apex Security & VIP Guard Protocol',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80',
    description: 'Crowd control officers, VIP personal bodyguards, metal detectors, and event entry access control team.',
    categories: ['Security'],
    services: [
      { title: 'Event Entry Guard Team (4 Guards)', priceRange: 'GHS 1,200', description: 'Professional entry screening, wristband checks, and crowd management.' }
    ],
    location: 'East Legon',
    city: 'Accra',
    serviceArea: 'Nationwide',
    contact: { phone: '+233 20 888 3344', whatsapp: '+233208883344' },
    portfolio: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80'],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 10,
  },
  {
    id: 'ven-115',
    ownerId: 'user-vendor-15',
    name: 'Focal Point Drone & Cinematic Video',
    logo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=80',
    description: 'Licensed 4K drone aerial videography, 360-degree event photo booths, and cinematic festival documentary films.',
    categories: ['Videography', 'Photography'],
    services: [
      { title: 'Aerial Drone Video Coverage (Full Day)', priceRange: 'GHS 1,800', description: '4K aerial shots, licensed pilot, color graded raw footage.' }
    ],
    location: 'Airport Residential',
    city: 'Accra',
    serviceArea: 'Accra & Tema',
    contact: { phone: '+233 55 777 2211', whatsapp: '+233557772211' },
    portfolio: ['https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=80'],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: 'ven-116',
    ownerId: 'user-vendor-16',
    name: 'Golden Touch Ushers & VIP Hospitality',
    logo: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&auto=format&fit=crop&q=80',
    description: 'Experienced ushering squad for academic graduations, weddings, corporate launches, and sports tournaments.',
    categories: ['Ushers'],
    services: [
      { title: 'Ushering Squad (5 Protocol Ushers)', priceRange: 'GHS 750', description: 'Guest registration, seating guidance, and program distribution.' }
    ],
    location: 'Cape Coast Central',
    city: 'Cape Coast',
    serviceArea: 'Central & Western Region',
    contact: { phone: '+233 24 444 8899', whatsapp: '+233244448899' },
    portfolio: ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80'],
    verified: true,
    status: 'published',
    createdAt: Date.now() - 86400000 * 12,
  },
];

const INITIAL_CATEGORIES: DynamicCategory[] = [
  { id: 'cat-1', name: 'Technology', slug: 'technology', iconName: 'Cpu', enabled: true, order: 1 },
  { id: 'cat-2', name: 'Education', slug: 'education', iconName: 'GraduationCap', enabled: true, order: 2 },
  { id: 'cat-3', name: 'Business', slug: 'business', iconName: 'Briefcase', enabled: true, order: 3 },
  { id: 'cat-4', name: 'Music & Concerts', slug: 'music-concerts', iconName: 'Music', enabled: true, order: 4 },
  { id: 'cat-5', name: 'Parties & Nightlife', slug: 'parties-nightlife', iconName: 'Sparkles', enabled: true, order: 5 },
  { id: 'cat-6', name: 'Sports', slug: 'sports', iconName: 'Trophy', enabled: true, order: 6 },
  { id: 'cat-7', name: 'Career', slug: 'career', iconName: 'UserCheck', enabled: true, order: 7 },
  { id: 'cat-8', name: 'Arts & Culture', slug: 'arts-culture', iconName: 'Palette', enabled: true, order: 8 },
  { id: 'cat-9', name: 'Community', slug: 'community', iconName: 'Users', enabled: true, order: 9 },
  { id: 'cat-10', name: 'Religion', slug: 'religion', iconName: 'Heart', enabled: true, order: 10 },
  { id: 'cat-11', name: 'Health & Wellness', slug: 'health-wellness', iconName: 'Activity', enabled: true, order: 11 },
];

const INITIAL_LOCATIONS: LocationNode[] = [
  { id: 'loc-1', country: 'Ghana', region: 'Greater Accra', city: 'Accra', area: 'Legon (University of Ghana)', venuesCount: 14, enabled: true },
  { id: 'loc-2', country: 'Ghana', region: 'Greater Accra', city: 'Accra', area: 'East Legon', venuesCount: 18, enabled: true },
  { id: 'loc-3', country: 'Ghana', region: 'Greater Accra', city: 'Accra', area: 'Cantonments', venuesCount: 8, enabled: true },
  { id: 'loc-4', country: 'Ghana', region: 'Greater Accra', city: 'Accra', area: 'Osu', venuesCount: 12, enabled: true },
  { id: 'loc-5', country: 'Ghana', region: 'Greater Accra', city: 'Accra', area: 'Airport Residential', venuesCount: 10, enabled: true },
  { id: 'loc-6', country: 'Ghana', region: 'Ashanti', city: 'Kumasi', area: 'KNUST Campus', venuesCount: 9, enabled: true },
  { id: 'loc-7', country: 'Ghana', region: 'Central', city: 'Cape Coast', area: 'UCC Main Campus', venuesCount: 6, enabled: true },
];

const INITIAL_USERS: AdminUserRecord[] = [
  { id: 'user-organizer-1', name: 'Alex Mensah', email: 'alex@nextup.app', role: 'organizer', status: 'active', registeredAt: Date.now() - 86400000 * 30, eventsCreatedCount: 4, savedEventsCount: 5, reportsSubmittedCount: 0 },
  { id: 'user-organizer-2', name: 'Kweku Addo', email: 'kweku@campusvibes.com', role: 'organizer', status: 'active', registeredAt: Date.now() - 86400000 * 25, eventsCreatedCount: 3, savedEventsCount: 2, reportsSubmittedCount: 0 },
  { id: 'user-vendor-1', name: 'SoundWave Studios', email: 'booking@soundwavegh.com', role: 'vendor', status: 'active', registeredAt: Date.now() - 86400000 * 45, eventsCreatedCount: 0, savedEventsCount: 12, reportsSubmittedCount: 0, vendorProfileId: 'ven-101' },
  { id: 'user-vendor-2', name: 'Savory Delights', email: 'events@savorydelights.com', role: 'vendor', status: 'active', registeredAt: Date.now() - 86400000 * 40, eventsCreatedCount: 0, savedEventsCount: 8, reportsSubmittedCount: 0, vendorProfileId: 'ven-102' },
  { id: 'user-vendor-13', name: 'VibeMasters Sound GH', email: 'contact@vibemasters.com', role: 'vendor', status: 'active', registeredAt: Date.now() - 86400000 * 2, eventsCreatedCount: 0, savedEventsCount: 1, reportsSubmittedCount: 0, vendorProfileId: 'ven-113' },
  { id: 'user-bad-1', name: 'SpamBot Accounts', email: 'spambot99@tempmail.com', role: 'user', status: 'suspended', registeredAt: Date.now() - 86400000 * 3, eventsCreatedCount: 1, savedEventsCount: 0, reportsSubmittedCount: 4 },
];

const INITIAL_SEARCH_LOGS: SearchLog[] = [
  { id: 'srch-1', query: 'AI Summit Accra', category: 'Technology', location: 'Accra', count: 420, status: 'popular' },
  { id: 'srch-2', query: 'Legon Pool Party', category: 'Parties & Nightlife', location: 'Legon', count: 310, status: 'trending' },
  { id: 'srch-3', query: 'DJ for wedding East Legon', category: 'DJ', location: 'East Legon', count: 185, status: 'popular' },
  { id: 'srch-4', query: 'Free photography workshop', category: 'Arts & Culture', location: 'Accra', count: 45, status: 'failed' },
  { id: 'srch-5', query: 'Catering under GHS 30', category: 'Catering / Food', location: 'Tema', count: 62, status: 'failed' },
];

const INITIAL_REPORTS_SEED: ReportModel[] = [
  { id: 'rep-1', reporterId: 'user-organizer-1', reporterName: 'Alex Mensah', targetType: 'event', targetId: 'evt-105', targetTitle: 'Afrobeats & Chill Rooftop Party', reason: 'Fake event', details: 'Event location address listed does not exist.', status: 'pending', createdAt: Date.now() - 86400000 * 1 },
  { id: 'rep-2', reporterId: 'user-organizer-2', reporterName: 'Kweku Addo', targetType: 'vendor', targetId: 'ven-105', targetTitle: 'DJ Spin Master & Party Vibes GH', reason: 'Spam', details: 'Duplicate vendor listing posted multiple times.', status: 'reviewing', createdAt: Date.now() - 86400000 * 2 },
];

const STORAGE_CATEGORIES = 'nextup_categories_v1';
const STORAGE_LOCATIONS = 'nextup_locations_v1';
const STORAGE_USERS = 'nextup_admin_users_v1';

const EventStoreContext = createContext<Ctx | null>(null);

export const EventStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [vendors, setVendors] = useState<VendorProfileModel[]>([]);
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const [reports, setReports] = useState<ReportModel[]>([]);
  const [categories, setCategories] = useState<DynamicCategory[]>([]);
  const [locations, setLocations] = useState<LocationNode[]>([]);
  const [usersList, setUsersList] = useState<AdminUserRecord[]>([]);
  const [searchLogs] = useState<SearchLog[]>(INITIAL_SEARCH_LOGS);

  // Load state from localStorage on mount or set initial seed data
  useEffect(() => {
    try {
      const storedEvts = localStorage.getItem(STORAGE_EVENTS);
      if (storedEvts) {
        const parsed: EventModel[] = JSON.parse(storedEvts);
        const merged = parsed.map((evt) => {
          const init = INITIAL_EVENTS.find((i) => i.id === evt.id);
          if (init) {
            return {
              ...init,
              ...evt,
              lineup: evt.lineup || init.lineup,
              agenda: evt.agenda || init.agenda,
              whatToExpect: evt.whatToExpect || init.whatToExpect,
              whoShouldAttend: evt.whoShouldAttend || init.whoShouldAttend,
              pastEditions: evt.pastEditions || init.pastEditions,
            };
          }
          return evt;
        });
        // Add any new initial seed events missing from stored list
        INITIAL_EVENTS.forEach((init) => {
          if (!merged.some((m) => m.id === init.id)) {
            merged.push(init);
          }
        });
        setEvents(merged);
      } else {
        setEvents(INITIAL_EVENTS);
      }

      const storedVends = localStorage.getItem(STORAGE_VENDORS);
      if (storedVends) {
        const parsedVends: VendorProfileModel[] = JSON.parse(storedVends);
        INITIAL_VENDORS.forEach((initV) => {
          if (!parsedVends.some((pv) => pv.id === initV.id)) {
            parsedVends.push(initV);
          }
        });
        setVendors(parsedVends);
      } else {
        setVendors(INITIAL_VENDORS);
      }

      const storedSaved = localStorage.getItem(STORAGE_SAVED);
      setSavedEventIds(storedSaved ? JSON.parse(storedSaved) : ['evt-101']);

      const storedReps = localStorage.getItem(STORAGE_REPORTS);
      setReports(storedReps ? JSON.parse(storedReps) : INITIAL_REPORTS_SEED);

      const storedCats = localStorage.getItem(STORAGE_CATEGORIES);
      setCategories(storedCats ? JSON.parse(storedCats) : INITIAL_CATEGORIES);

      const storedLocs = localStorage.getItem(STORAGE_LOCATIONS);
      setLocations(storedLocs ? JSON.parse(storedLocs) : INITIAL_LOCATIONS);

      const storedUsers = localStorage.getItem(STORAGE_USERS);
      setUsersList(storedUsers ? JSON.parse(storedUsers) : INITIAL_USERS);
    } catch {
      setEvents(INITIAL_EVENTS);
      setVendors(INITIAL_VENDORS);
      setSavedEventIds(['evt-101']);
      setReports(INITIAL_REPORTS_SEED);
      setCategories(INITIAL_CATEGORIES);
      setLocations(INITIAL_LOCATIONS);
      setUsersList(INITIAL_USERS);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try { localStorage.setItem(STORAGE_EVENTS, JSON.stringify(events)); } catch {}
  }, [events]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_VENDORS, JSON.stringify(vendors)); } catch {}
  }, [vendors]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_SAVED, JSON.stringify(savedEventIds)); } catch {}
  }, [savedEventIds]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_REPORTS, JSON.stringify(reports)); } catch {}
  }, [reports]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_CATEGORIES, JSON.stringify(categories)); } catch {}
  }, [categories]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_LOCATIONS, JSON.stringify(locations)); } catch {}
  }, [locations]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_USERS, JSON.stringify(usersList)); } catch {}
  }, [usersList]);

  // Event Handlers
  const saveDraftEvent = (data: Partial<EventModel> & { title: string }): EventModel => {
    const id = data.id || `evt-${Date.now().toString(36)}`;
    const now = Date.now();
    const existing = events.find(e => e.id === id);

    const model: EventModel = {
      id,
      ownerId: data.ownerId || existing?.ownerId || 'current-user',
      title: data.title,
      description: data.description || existing?.description || '',
      category: data.category || existing?.category || 'Other',
      coverImage: data.coverImage || existing?.coverImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
      galleryImages: data.galleryImages ?? existing?.galleryImages,
      videoEmbedUrl: data.videoEmbedUrl ?? existing?.videoEmbedUrl,
      startAt: data.startAt || existing?.startAt || new Date(now + 86400000 * 7).toISOString(),
      endAt: data.endAt || existing?.endAt,
      venue: data.venue || existing?.venue || 'TBD Venue',
      address: data.address || existing?.address || 'Main Road',
      city: data.city || existing?.city || 'Accra',
      latitude: data.latitude ?? existing?.latitude,
      longitude: data.longitude ?? existing?.longitude,
      price: data.price ?? existing?.price ?? 'Free',
      isFree: data.isFree ?? existing?.isFree ?? true,
      ticketBadge: data.ticketBadge ?? existing?.ticketBadge,
      externalLink: data.externalLink ?? existing?.externalLink,
      contact: data.contact ?? existing?.contact,
      organizer: data.organizer || existing?.organizer || { name: 'Event Organizer' },
      lineup: data.lineup ?? existing?.lineup,
      highlights: data.highlights ?? existing?.highlights,
      refundPolicy: data.refundPolicy ?? existing?.refundPolicy,
      organizerStats: data.organizerStats ?? existing?.organizerStats,
      agenda: data.agenda ?? existing?.agenda,
      whatToExpect: data.whatToExpect ?? existing?.whatToExpect,
      whoShouldAttend: data.whoShouldAttend ?? existing?.whoShouldAttend,
      pastEditions: data.pastEditions ?? existing?.pastEditions,
      status: data.status || existing?.status || 'draft',
      hidden: existing?.hidden || false,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    setEvents(prev => {
      const idx = prev.findIndex(e => e.id === id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = model;
        return copy;
      }
      return [model, ...prev];
    });

    return model;
  };

  const publishEvent = (id: string) => {
    let updated: EventModel | undefined;
    setEvents(prev =>
      prev.map(e => {
        if (e.id === id) {
          updated = { ...e, status: 'published', updatedAt: Date.now() };
          return updated;
        }
        return e;
      })
    );
    return updated;
  };

  const updateEventStatus = (id: string, status: EventStatus) => {
    let updated: EventModel | undefined;
    setEvents(prev =>
      prev.map(e => {
        if (e.id === id) {
          updated = { ...e, status, updatedAt: Date.now() };
          return updated;
        }
        return e;
      })
    );
    return updated;
  };

  const getEvent = (id: string) => events.find(e => e.id === id);

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Saved Events
  const toggleSaveEvent = (eventId: string) => {
    setSavedEventIds(prev =>
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  const isEventSaved = (eventId: string) => savedEventIds.includes(eventId);

  // Vendor Profile Handlers
  const saveVendorProfile = (data: Partial<VendorProfileModel> & { name: string }): VendorProfileModel => {
    const id = data.id || `ven-${Date.now().toString(36)}`;
    const now = Date.now();
    const existing = vendors.find(v => v.id === id);

    const model: VendorProfileModel = {
      id,
      ownerId: data.ownerId || existing?.ownerId || 'current-user',
      name: data.name,
      logo: data.logo || existing?.logo || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80',
      description: data.description || existing?.description || '',
      categories: data.categories || existing?.categories || ['Other'],
      services: data.services || existing?.services || [],
      location: data.location || existing?.location || 'Accra',
      city: data.city || existing?.city || 'Accra',
      serviceArea: data.serviceArea || existing?.serviceArea || 'Greater Accra Region',
      latitude: data.latitude ?? existing?.latitude,
      longitude: data.longitude ?? existing?.longitude,
      contact: data.contact || existing?.contact || {},
      portfolio: data.portfolio || existing?.portfolio || [],
      verified: existing?.verified || false,
      status: data.status || existing?.status || 'published',
      hidden: existing?.hidden || false,
      createdAt: existing?.createdAt || now,
    };

    setVendors(prev => {
      const idx = prev.findIndex(v => v.id === id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = model;
        return copy;
      }
      return [model, ...prev];
    });

    return model;
  };

  const getVendor = (id: string) => vendors.find(v => v.id === id);

  const getVendorByOwner = (ownerId: string) => vendors.find(v => v.ownerId === ownerId);

  const toggleVendorVerification = (vendorId: string) => {
    setVendors(prev =>
      prev.map(v => (v.id === vendorId ? { ...v, verified: !v.verified } : v))
    );
  };

  const approveVendorVerification = (vendorId: string) => {
    setVendors(prev =>
      prev.map(v => (v.id === vendorId ? { ...v, verified: true } : v))
    );
  };

  const rejectVendorVerification = (vendorId: string) => {
    setVendors(prev =>
      prev.map(v => (v.id === vendorId ? { ...v, verified: false } : v))
    );
  };

  // Moderation Handlers
  const submitReport = (reportData: Omit<ReportModel, 'id' | 'createdAt' | 'status'>) => {
    const newReport: ReportModel = {
      ...reportData,
      id: `rep-${Date.now().toString(36)}`,
      createdAt: Date.now(),
      status: 'pending',
    };
    setReports(prev => [newReport, ...prev]);
  };

  const toggleHideItem = (targetType: 'event' | 'vendor', targetId: string) => {
    if (targetType === 'event') {
      setEvents(prev =>
        prev.map(e => (e.id === targetId ? { ...e, hidden: !e.hidden } : e))
      );
    } else {
      setVendors(prev =>
        prev.map(v => (v.id === targetId ? { ...v, hidden: !v.hidden } : v))
      );
    }
  };

  const updateReportStatus = (reportId: string, status: ReportModel['status']) => {
    setReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, status } : r))
    );
  };

  // User Actions
  const toggleUserStatus = (userId: string) => {
    setUsersList(prev =>
      prev.map(u => (u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u))
    );
  };

  // Dynamic Category Handlers
  const addCategory = (cat: Omit<DynamicCategory, 'id'>) => {
    const newCat: DynamicCategory = {
      ...cat,
      id: `cat-${Date.now().toString(36)}`,
    };
    setCategories(prev => [...prev, newCat]);
  };

  const updateCategory = (id: string, patch: Partial<DynamicCategory>) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, ...patch } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Dynamic Location Handlers
  const addLocation = (loc: Omit<LocationNode, 'id'>) => {
    const newLoc: LocationNode = {
      ...loc,
      id: `loc-${Date.now().toString(36)}`,
    };
    setLocations(prev => [...prev, newLoc]);
  };

  const updateLocation = (id: string, patch: Partial<LocationNode>) => {
    setLocations(prev =>
      prev.map(l => (l.id === id ? { ...l, ...patch } : l))
    );
  };

  const deleteLocation = (id: string) => {
    setLocations(prev => prev.filter(l => l.id !== id));
  };

  return (
    <EventStoreContext.Provider
      value={{
        events,
        vendors,
        savedEventIds,
        reports,
        categories,
        locations,
        usersList,
        searchLogs,
        saveDraftEvent,
        publishEvent,
        updateEventStatus,
        getEvent,
        deleteEvent,
        toggleSaveEvent,
        isEventSaved,
        saveVendorProfile,
        getVendor,
        getVendorByOwner,
        toggleVendorVerification,
        approveVendorVerification,
        rejectVendorVerification,
        submitReport,
        toggleHideItem,
        updateReportStatus,
        toggleUserStatus,
        addCategory,
        updateCategory,
        deleteCategory,
        addLocation,
        updateLocation,
        deleteLocation,
      }}
    >
      {children}
    </EventStoreContext.Provider>
  );
};

export const useEventStore = () => {
  const ctx = useContext(EventStoreContext);
  if (!ctx) throw new Error('useEventStore must be used within EventStoreProvider');
  return ctx;
};

export default EventStoreContext;
