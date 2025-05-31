import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Colors.css"; // optional: for custom styles
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Colors = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const token = localStorage.getItem("token");
  console.log(totalPages , currentPage);
  
  const fetchColors = async (page = 1) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/color/list-colors?page=${page}&limit=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { totalPages, currentPage } = res.data.data.pagination;
      setColors(res.data.data.colors || []);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
    } catch (error) {
      console.error("Error fetching colors:", error);
      toast.error("Failed to load colors.");
    }
  };

  useEffect(() => {
    fetchColors(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a color name.");
      return;
    }

    if (!image && !isEditing) {
      toast.error("Please select image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    const url = isEditing
      ? `${process.env.REACT_APP_API_URL}/api/v1/color/edit-color/${editId}`
      : `${process.env.REACT_APP_API_URL}/api/v1/color/add-color`;

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
          ? "Color updated successfully!"
          : "Color added successfully!"
      );
      setName("");
      setImage(null);
      setIsEditing(false);
      setEditId(null);
      fetchColors();
    } catch (error) {
      console.error("Error saving color:", error);
      toast.error(
        isEditing ? "Failed to update color." : "Failed to add color."
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
          `${process.env.REACT_APP_API_URL}/api/v1/color/delete-color/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Color deleted successfully!");
        fetchColors();
      } catch (error) {
        console.error("Error deleting color:", error);
        toast.error("Failed to delete color.");
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="color-form">
        <div className="form-group">
          <label>Color Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Color Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn">
            {isEditing ? "Update Color" : "Add Color"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn cancel"
              onClick={() => {
                setIsEditing(false);
                setEditId(null);
                setName("");
                setImage(null);
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <hr />

      <h3>Color List</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {colors.length > 0 ? (
              colors.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                  {/* <td>{index + 1}</td> */}
                  <td>
                      {cat.name}
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
                    <button
                      className="icon-btn edit"
                      title="Edit"
                      onClick={() => {
                        setIsEditing(true);
                        setEditId(cat._id);
                        setName(cat.name);
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
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No colors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
       {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Colors;
