import { UUID } from "crypto";

export interface Journey {
  id: UUID;
  created_at: string;
  from_address: string;
  to_address: string;
  fare: number;
  inbound: boolean;
  status: string;
  traveller_info: Traveller;
} 

export interface Traveller {
  id: UUID;
  created_at: string;
  first_name: string;
  last_name: string;
  passenger_count: number;
  flight_number: string;
  phone_number: string;
}