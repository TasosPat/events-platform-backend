import { Event, NewEvent } from "../types";
export declare function fetchEvents(): Promise<Event[]>;
export declare function fetchEventByID(event_id: number): Promise<Event | null>;
export declare function addEvent(newEvent: NewEvent): Promise<Event>;
export declare function removeEvent(event_id: number): Promise<Event>;
export declare function modifyEvent(newEvent: NewEvent, event_id: number): Promise<any>;
//# sourceMappingURL=eventModels.d.ts.map