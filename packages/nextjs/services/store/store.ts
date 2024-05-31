import create from "zustand";
import { persist } from "zustand/middleware";
import { EventModelForStore } from "~~/models/event.model";
import { TicketModel } from "~~/models/ticket.model";
import scaffoldConfig from "~~/scaffold.config";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

type GlobalState = {
  nativeCurrencyPrice: number;
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
  incomingEvents: EventModelForStore[];
  addEvent: (newEvent: EventModelForStore) => void;
  purchasedTickets: TicketModel[];
  purchaseTicket: (ticketId: string, eventId: string) => void;
};

export const useGlobalState = create<GlobalState>()(
  persist(
    (set, get) => ({
      nativeCurrencyPrice: 0,
      setNativeCurrencyPrice: (newValue: number): void => set(() => ({ nativeCurrencyPrice: newValue })),
      targetNetwork: scaffoldConfig.targetNetworks[0],
      setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => set(() => ({ targetNetwork: newTargetNetwork })),
      incomingEvents: [],
      myTickets: [],
      addEvent: (newEvent: EventModelForStore): void =>
        set(state => ({ incomingEvents: [...state.incomingEvents, newEvent] })),
      purchasedTickets: [],

      purchaseTicket: (ticketId: string, eventId: string): void => {
        const state = get();
        const event = state.incomingEvents.find(event => event.id === eventId);
        if (event && event.availableTickets > 0) {
          const newTicket: TicketModel = {
            id: ticketId,
            eventId: event.id,
            title: event.title,
            imageUrl:
              "https://www.shutterstock.com/shutterstock/photos/1050259787/display_1500/stock-vector-ticket-icon-vector-line-raffle-ticket-symbol-trendy-flat-outline-ui-sign-design-thin-linear-1050259787.jpg",
          };
          set(state => ({
            purchasedTickets: [...state.purchasedTickets, newTicket],
            incomingEvents: state.incomingEvents.map(evt =>
              evt.id === eventId ? { ...evt, availableTickets: evt.availableTickets - 1 } : evt,
            ),
          }));
        }
      },
    }),
    {
      name: "global-state", // Local storage name
    },
  ),
);