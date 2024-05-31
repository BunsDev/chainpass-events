export interface EventModel {
  name: string;
  date: bigint;
  description: string;
  ticketSupply: bigint;
  ticketsMinted: bigint;
  exists: boolean;
  imageUrl: string;
}

export interface EventModelForStore {
  availableTickets: number;
  title: string;
  date: bigint;
  description: string;
  ticketSupply: bigint;
  ticketsMinted: bigint;
  exists: boolean;
  id: string;
}

export interface CreateEventDTO {
  name: string;
  date: number;
  ticketSupply: number;
}