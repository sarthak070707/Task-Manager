// ============================================
//  Task API — Full CRUD Operations
// ============================================
import API from "./axios";

/**
 * Get all tasks for the logged-in user
 * GET /api/tasks
 * @returns {Array<{ _id, title, description, status, userId, createdAt, updatedAt }>}
 */
export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

/**
 * Create a new task
 * POST /api/tasks
 * @param {string} title
 * @param {string} [description]
 * @returns {{ _id, title, description, status, userId, createdAt, updatedAt }}
 */
export const createTask = async (title, description = "") => {
  const res = await API.post("/tasks", { title, description });
  return res.data;
};

/**
 * Update an existing task
 * PUT /api/tasks/:id
 * @param {string} id - Task ID
 * @param {Object} updates - Fields to update
 * @param {string} [updates.title]
 * @param {string} [updates.description]
 * @param {string} [updates.status] - "pending" | "completed"
 * @returns {{ _id, title, description, status, userId, createdAt, updatedAt }}
 */
export const updateTask = async (id, updates) => {
  const res = await API.put(`/tasks/${id}`, updates);
  return res.data;
};

/**
 * Delete a task
 * DELETE /api/tasks/:id
 * @param {string} id - Task ID
 * @returns {{ message: string }}
 */
export const deleteTask = async (id) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};

/**
 * Toggle task status between "pending" and "completed"
 * PUT /api/tasks/:id
 * @param {string} id - Task ID
 * @param {string} currentStatus - Current status of the task
 * @returns {{ _id, title, description, status, userId, createdAt, updatedAt }}
 */
export const toggleTaskStatus = async (id, currentStatus) => {
  const newStatus = currentStatus === "completed" ? "pending" : "completed";
  const res = await API.put(`/tasks/${id}`, { status: newStatus });
  return res.data;
};
