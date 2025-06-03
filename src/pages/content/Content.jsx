import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const Content = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("token");

  const fetchPages = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/content/list-content`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPages(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load static Content");
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !slug) return toast.error("Title & Slug are required!");

    const body = { title, slug, description };

    const url = isEditing
      ? `${process.env.REACT_APP_API_URL}/api/v1/content/edit-content/${editId}`
      : `${process.env.REACT_APP_API_URL}/api/v1/content/add-content`;

    const method = isEditing ? axios.put : axios.post;

    try {
      await method(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(isEditing ? "Content updated!" : "Content added!");
      fetchPages();
      setTitle("");
      setSlug("");
      setDescription("");
      setEditId(null);
      setIsEditing(false);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (page) => {
    setIsEditing(true);
    setEditId(page._id);
    setTitle(page.title);
    setSlug(page.slug);
    setDescription(page.description);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/v1/content/delete-content/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Content deleted!");
        fetchPages();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/content/status-content/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPages();
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="page-form">
        <div className="form-group">
          <label>Title:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Slug:</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="btn" type="submit">
            {isEditing ? "Update Content" : "Add Content"}
          </button>
          {isEditing && (
            <button
              className="btn cancel"
              onClick={() => {
                setIsEditing(false);
                setEditId(null);
                setTitle("");
                setSlug("");
                setDescription("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3>Static Pages</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.length ? (
              pages.map((page, i) => (
                <tr key={page._id}>
                  <td>{i + 1}</td>
                  <td>{page.title}</td>
                  <td>{page.slug}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={page.status}
                        onChange={() => toggleStatus(page._id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <button className="icon-btn edit" onClick={() => handleEdit(page)}>
                      <FaEdit />
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDelete(page._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Content found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Content;
