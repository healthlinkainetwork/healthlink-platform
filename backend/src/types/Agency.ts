// backend/src/types/Agency.ts

export interface Agency {
  id: string;
  name: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  city?: string;
  state?: string;
  active: boolean;
  createdAt: string;
}
