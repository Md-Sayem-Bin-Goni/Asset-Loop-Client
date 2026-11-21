export type UserRole = "customer" | "owner" | "admin";

export interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  phone?: string;
  address?: string;
  createdAt?: string;
}

export type EquipmentCategory =
  | "Construction Equipment"
  | "Photography Equipment"
  | "Vehicles & Transportation"
  | "Agriculture Equipment"
  | "Electronics"
  | "Event Equipment";

export type RentalType = "Daily" | "Weekly" | "Monthly";

export type EquipmentStatus = "Pending" | "Approved" | "Rejected";

export interface Equipment {
  _id: string;
  name: string;
  description: string;
  category: EquipmentCategory;
  location: string;
  rentalPrice: number;
  rentalType: RentalType;
  availableQuantity: number;
  condition: string;
  brand: string;
  model: string;
  image: string;
  terms: string;
  status: EquipmentStatus;
  owner: {
    name: string;
    email: string;
    image?: string;
  };
  createdAt: string;
}