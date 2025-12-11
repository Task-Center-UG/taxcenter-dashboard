const ROLE_STORAGE_KEY = "user_role";

export const saveRole = (roleName: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ROLE_STORAGE_KEY, roleName);
  }
};

export const getRole = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ROLE_STORAGE_KEY);
  }
  return null;
};

export const clearRole = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ROLE_STORAGE_KEY);
  }
};

export const isAdmin = (): boolean => {
  return getRole() === "Admin";
};

export const isTaxVolunteer = (): boolean => {
  return getRole() === "Tax Volunteer";
};

export const getRedirectPath = (): string => {
  const role = getRole();
  if (role === "Admin") {
    return "/dashboard";
  } else if (role === "Tax Volunteer") {
    return "/relawan-pajak/data-diri";
  }
  return "/dashboard"; // default fallback
};

export const handleLogout = async () => {
  clearRole();
  // You can add logout API call here if needed
  if (typeof window !== "undefined") {
    window.location.href = "/sign-in";
  }
};
