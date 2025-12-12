import { useState, useEffect } from "react";
import axios from "axios";
import { UserData, saveUserData, getUserData } from "@/utils/userManager";

const proxyUrl = "/api";

export const useUserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${proxyUrl}/v1/users/profile`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.data.status === "OK" && response.status === 200) {
        const profileData = response.data.data;
        saveUserData(profileData);
        setUserData(profileData);
        return profileData;
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to fetch user profile");
      // Fallback to localStorage data if API fails
      const cachedData = getUserData();
      setUserData(cachedData);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to fetch from API on mount/refresh
    fetchUserProfile();
  }, []);

  return {
    userData,
    loading,
    error,
    refetch: fetchUserProfile,
  };
};
