// ============================================
//  User API — Profile & Account
// ============================================
import API from "./axios";

/**
 * Get the logged-in user's profile
 * GET /api/auth/me
 * @returns {{ _id, name, email, createdAt, updatedAt }}
 */
export const getProfile = async () => {
  const res = await API.get("/auth/me");
  return res.data;
};
