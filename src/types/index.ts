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

export interface PlatformUser extends UserProfile {
  _id: string;
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

export type PaymentStatus = "Unpaid" | "Paid";
export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed" | string;

export interface Booking {
  _id: string;
  equipmentId: string;
  equipmentName: string;
  equipmentImage?: string;
  category?: EquipmentCategory | string;
  ownerEmail: string;
  ownerName?: string;
  customerEmail: string;
  customerName?: string;
  contactNumber: string;
  deliveryAddress: string;
  notes?: string;
  startDate: string;
  endDate: string;
  requiredQuantity: number;
  totalAmount: number;
  paymentStatus: PaymentStatus | string;
  bookingStatus: BookingStatus;
  bookingDate: string;
  transactionId?: string;
  createdAt?: string;
}

export interface FavoriteItem {
  _id: string;
  customerEmail?: string;
  equipmentId: string;
  equipmentName: string;
  category: EquipmentCategory | string;
  rentalPrice: number;
  rentalType: RentalType | string;
  image: string;
  location: string;
  createdAt?: string;
}

export interface PaymentRecord {
  _id?: string;
  bookingId: string;
  equipmentId: string;
  equipmentName: string;
  customerEmail: string;
  ownerEmail: string;
  amount: number;
  transactionId: string;
  stripeSessionId: string;
  paidAt: string;
  createdAt?: string;
}

export interface MonthlyStat {
  month: string;
  bookings: number;
  revenue: number;
}

export interface AdminAnalyticsStats {
  totalUsers: number;
  totalEquipment: number;
  pendingApprovals: number;
  totalBookings: number;
  completedRentals: number;
  totalRevenue: number;
  monthlyStats: MonthlyStat[];
}

export interface OwnerAnalyticsStats {
  totalListedEquipment: number;
  completedRentals: number;
  totalEarnings: number;
  monthlyStats: MonthlyStat[];
}


export type PaymentStatus = "Unpaid" | "Paid";
export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed" | string;

export interface Booking {
  _id: string;
  equipmentId: string;
  equipmentName: string;
  equipmentImage?: string;
  category?: EquipmentCategory | string;
  ownerEmail: string;
  ownerName?: string;
  customerEmail: string;
  customerName?: string;
  contactNumber: string;
  deliveryAddress: string;
  notes?: string;
  startDate: string;
  endDate: string;
  requiredQuantity: number;
  totalAmount: number;
  paymentStatus: PaymentStatus | string;
  bookingStatus: BookingStatus;
  bookingDate: string;
  transactionId?: string;
  createdAt?: string;
}

export interface FavoriteItem {
  _id: string;
  customerEmail?: string;
  equipmentId: string;
  equipmentName: string;
  category: EquipmentCategory | string;
  rentalPrice: number;
  rentalType: RentalType | string;
  image: string;
  location: string;
  createdAt?: string;
}

export interface PaymentRecord {
  _id?: string;
  bookingId: string;
  equipmentId: string;
  equipmentName: string;
  customerEmail: string;
  ownerEmail: string;
  amount: number;
  transactionId: string;
  stripeSessionId: string;
  paidAt: string;
  createdAt?: string;
}

export interface MonthlyStat {
  month: string;
  bookings: number;
  revenue: number;
}

export interface AdminAnalyticsStats {
  totalUsers: number;
  totalEquipment: number;
  pendingApprovals: number;
  totalBookings: number;
  completedRentals: number;
  totalRevenue: number;
  monthlyStats: MonthlyStat[];
}

export interface OwnerAnalyticsStats {
  totalListedEquipment: number;
  completedRentals: number;
  totalEarnings: number;
  monthlyStats: MonthlyStat[];
}