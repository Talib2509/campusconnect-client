export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  authorName: string;
  createdAt: string;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string | null;
}

export interface UpdateEventRequest {
  title: string;
  description: string;
  date: string | null;
}
