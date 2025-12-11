export interface UserRole {
  id: number;
  name: string;
}

export interface UserData {
  username: string;
  full_name: string;
  email: string;
  picture_url: string;
  role: UserRole;
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
