import axiosInstance from "../axiosInstance";

export const fetchUser = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/me");
    return res.data.user || {}; // Return empty object if no user data is found
  } catch (error) {
    console.log("Error fetching user:", error);
    return {}; // Return empty object in case of error
  }
};

export const fetchAccounts = async () => {
  try {
    const res = await axiosInstance.get("/api/users/suggested");
    return res.data.suggestedUsers || [];
  } catch (error) {
    console.log("Error fetching account suggestions:", error);
    return []; // Return empty array in case of error
  }
};

export const fetchProfileAccounts = async (username) => {
  try {
    const res = await axiosInstance.get(`/api/users/suggested/${username}`);
    return res.data.profileSuggestedUsers || [];
  } catch (error) {
    console.log("Error fetching account suggestions:", error);
    return []; // Return empty array in case of error
  }
};

export const fetchProfile = async (username) => {
  try {
    const res = await axiosInstance.get(`/api/users/profile/${username}`);
    return res.data || {};
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {};
  }
};

export const fetchSuggestedPosts = async () => {
  try {
    const res = await axiosInstance.get("/api/posts/following");
    return res.data.posts || []; // Ensure it always returns an array
  } catch (error) {
    console.log("Error fetching suggested posts:", error);
    return []; // Return empty array in case of error
  }
};

export const fetchAllPosts = async () => {
  try {
    const res = await axiosInstance.get("/api/posts/all");
    return res.data.posts || []; // Ensure it always returns an array
  } catch (error) {
    console.log("Error fetching all posts:", error);
    return []; // Return empty array in case of error
  }
};

export const fetchUserPosts = async (username) => {
  try {
    const res = await axiosInstance.get(`/api/posts/user/${username}`);
    return res.data?.posts || [];
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
};

export const fetchUserLikedPosts = async (username) => {
  try {
    const res = await axiosInstance.get(`/api/posts/liked/${username}`);
    return res.data?.likedPosts || [];
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
};
