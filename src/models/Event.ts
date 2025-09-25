// src/models/Event.ts
export interface NewEvent {
    title: string;
    description: string;
    date: string; // ISO format (YYYY-MM-DD)
    location: string;
    price?: number; // optional, since some events are free
  }

  export interface Event extends NewEvent {
    id: number;
  }