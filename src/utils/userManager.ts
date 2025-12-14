export interface UserRole {
  id: number;
  name: string;
}

export interface MbkmRegistration {
  id: number;
  full_name: string;
  class: string;
  npm: string;
  address: string;
  phone_number: string;
  email: string;
  tax_volunteer_activities: string;
  is_already_tax_volunteer: string;
  ipk: number;
  krs: string;
  transcripts: string;
  status: string;
  is_active: string;
  created_at: string;
  updated_at: string;
  region_id: number;
  major_id: number;
}

export interface NonMbkmRegistration {
  id: number;
  full_name: string;
  class: string;
  npm: string;
  address: string;
  phone_number: string;
  email: string;
  tax_volunteer_activities: string;
  is_already_tax_volunteer: string;
  ipk: number;
  krs: string;
  transcripts: string;
  status: string;
  is_active: string;
  created_at: string;
  updated_at: string;
  region_id: number;
  major_id: number;
}

export interface UserData {
  id?: number;
  username: string;
  full_name: string;
  email: string;
  picture_url: string;
  role: UserRole;
  mbkm_registration?: MbkmRegistration | null;
  non_mbkm_registration?: NonMbkmRegistration | null;
}

const USER_DATA_KEY = "userData";

export const saveUserData = (userData: UserData): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }
};

export const getUserData = (): UserData | null => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const clearUserData = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_DATA_KEY);
  }
};
