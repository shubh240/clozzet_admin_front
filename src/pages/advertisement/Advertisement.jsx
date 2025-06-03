import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./index.css"; // optional: for custom styles
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Advertisement = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [advertisementList, setAdvertisementList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchList = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/advertisement/list-advertisement`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdvertisementList(res.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a name.");
      return;
    }

    if (!slug) {
      toast.error("Please enter a slug.");
      return;
    }

    if (!image && !isEditing) {
      toast.error("Please select image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    if (image) formData.append("image", image);

    const url = isEditing
      ? `${process.env.REACT_APP_API_URL}/api/v1/advertisement/edit-advertisement/${editId}`
      : `${process.env.REACT_APP_API_URL}/api/v1/advertisement/add-advertisement`;

    try {
      const method = isEditing ? axios.put : axios.post;

      await method(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(
        isEditing
          ? "Advertisement updated successfully!"
          : "Advertisement added successfully!"
      );
      setName("");
      setSlug("");
      setImage(null);
      setIsEditing(false);
      setEditId(null);
      fetchList();
    } catch (error) {
      console.error("Error saving advertisement:", error);
      toast.error(
        isEditing ? "Failed to update advertisement." : "Failed to add advertisement."
      );
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/v1/advertisement/delete-advertisement/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Advertisement deleted successfully!");
        fetchList();
      } catch (error) {
        console.error("Error deleting Advertisement:", error);
        toast.error("Failed to delete Advertisement.");
      }
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/advertisement/status-advertisement/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      fetchList();
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label>Advertisement Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Advertisement Slug:</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Advertisement Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn">
            {isEditing ? "Update Advertisement" : "Add Advertisement"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn cancel"
              onClick={() => {
                setIsEditing(false);
                setEditId(null);
                setName("");
                setSlug("");
                setImage(null);
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <hr />

      <h3>Advertisement List</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {advertisementList.length > 0 ? (
              advertisementList.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{index + 1}</td>
                  <td>
                      {cat.name}
                  </td>
                  <td>
                      {cat.slug}
                  </td>
                  <td>
                    {cat.image && (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        style={{ width: "50px", borderRadius: "4px" }}
                      />
                    )}
                  </td>
                  <td>
                     <label className="switch">
                      <input
                        type="checkbox"
                        checked={cat.status}
                        onChange={() => handleStatusToggle(cat._id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <button
                      className="icon-btn edit"
                      title="Edit"
                      onClick={() => {
                        setIsEditing(true);
                        setEditId(cat._id);
                        setName(cat.name);
                        setSlug(cat.slug);
                        setImage(null);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="icon-btn delete"
                      title="Delete"
                      onClick={() => handleDelete(cat._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Advertisement Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Advertisement;
