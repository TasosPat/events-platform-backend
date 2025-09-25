// src/models/Event.ts
export interface Event {
    id: number;
    title: string;
    description: string;
    date: string; // ISO format (YYYY-MM-DD)
    location: string;
    price?: number; // optional, since some events are free
  }

  