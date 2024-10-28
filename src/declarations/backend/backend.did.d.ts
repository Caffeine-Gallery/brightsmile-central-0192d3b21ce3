import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Appointment {
  'date' : string,
  'name' : string,
  'time' : string,
  'email' : string,
  'phone' : string,
}
export interface _SERVICE {
  'bookAppointment' : ActorMethod<[Appointment], boolean>,
  'getAllAppointments' : ActorMethod<[], Array<Appointment>>,
  'getAvailableTimeSlots' : ActorMethod<[string], Array<string>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
