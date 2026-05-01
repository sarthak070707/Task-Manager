import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard({ setToken }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 400) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setAdding(true);
      await API.post("/tasks", { title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error("Add task error:", err);
    } finally {
      setAdding(false);
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    try {
      await API.put(`/tasks/${task._id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) return;
    try {
      await API.put(`/tasks/${editingTask._id}`, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setDeletingId(null);
      fetchTasks();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const pendingTasks = tasks.filter((t) => t.status !== "completed");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="brand">✦ TaskFlow</div>
        <div className="user-info">
          <span className="greeting">Your workspace</span>
          <button className="btn-logout" onClick={logout}>
            Sign Out
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-card total">
          <div className="stat-number">{tasks.length}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-number">{pendingTasks.length}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-number">{completedTasks.length}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      {/* Add Task */}
      <div className="add-task-form">
        <h3>➕ New Task</h3>
        <form onSubmit={addTask}>
          <div className="add-task-inputs">
            <input
              id="new-task-title"
              className="form-input"
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              id="new-task-description"
              className="form-input"
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              id="add-task-btn"
              className="btn btn-primary"
              type="submit"
              disabled={adding || !title.trim()}
            >
              {adding ? <span className="loader"></span> : "Add"}
            </button>
          </div>
        </form>
      </div>

      {/* Loading */}
      {loading && (
        <div className="empty-state">
          <span className="loader" style={{ width: 32, height: 32 }}></span>
        </div>
      )}

      {/* Empty state */}
      {!loading && tasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No tasks yet</h3>
          <p>Add your first task above to get started!</p>
        </div>
      )}

      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <>
          <div className="task-section-title">
            Pending — {pendingTasks.length} task{pendingTasks.length !== 1 ? "s" : ""}
          </div>
          <div className="task-list">
            {pendingTasks.map((task, i) => (
              <div
                className="task-card"
                key={task._id}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div
                  className="task-checkbox"
                  onClick={() => toggleStatus(task)}
                  title="Mark complete"
                ></div>
                <div className="task-info">
                  <div className="task-title">{task.title}</div>
                  {task.description && (
                    <div className="task-description">{task.description}</div>
                  )}
                </div>
                <span className="status-badge pending">Pending</span>
                <div className="task-actions">
                  <button
                    className="btn-icon"
                    onClick={() => openEdit(task)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  {deletingId === task._id ? (
                    <div className="delete-confirm">
                      <button
                        className="btn-icon"
                        onClick={() => deleteTask(task._id)}
                        title="Confirm delete"
                        style={{ color: "var(--danger)" }}
                      >
                        ✓
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => setDeletingId(null)}
                        title="Cancel"
                      >
                        ✗
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn-icon"
                      onClick={() => setDeletingId(task._id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <>
          <div className="task-section-title">
            Completed — {completedTasks.length} task{completedTasks.length !== 1 ? "s" : ""}
          </div>
          <div className="task-list">
            {completedTasks.map((task, i) => (
              <div
                className="task-card completed"
                key={task._id}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div
                  className="task-checkbox checked"
                  onClick={() => toggleStatus(task)}
                  title="Mark pending"
                ></div>
                <div className="task-info">
                  <div className="task-title">{task.title}</div>
                  {task.description && (
                    <div className="task-description">{task.description}</div>
                  )}
                </div>
                <span className="status-badge completed">Done</span>
                <div className="task-actions">
                  <button
                    className="btn-icon"
                    onClick={() => openEdit(task)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  {deletingId === task._id ? (
                    <div className="delete-confirm">
                      <button
                        className="btn-icon"
                        onClick={() => deleteTask(task._id)}
                        title="Confirm delete"
                        style={{ color: "var(--danger)" }}
                      >
                        ✓
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => setDeletingId(null)}
                        title="Cancel"
                      >
                        ✗
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn-icon"
                      onClick={() => setDeletingId(task._id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Edit Modal */}
      {editingTask && (
        <div className="modal-overlay" onClick={() => setEditingTask(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Task</h3>
            <div className="form-group">
              <label htmlFor="edit-title">Title</label>
              <input
                id="edit-title"
                className="form-input"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-description">Description</label>
              <input
                id="edit-description"
                className="form-input"
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setEditingTask(null)}
              >
                Cancel
              </button>
              <button
                id="save-edit-btn"
                className="btn btn-primary"
                onClick={saveEdit}
                style={{ width: "auto" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
