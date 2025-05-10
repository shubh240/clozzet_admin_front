import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Categories.css"; // optional: for custom styles
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Categories = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/category/list-category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a category name.");
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
      ? `${process.env.REACT_APP_API_URL}/api/v1/category/edit-category/${editId}`
      : `${process.env.REACT_APP_API_URL}/api/v1/category/add-category`;

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
          ? "Category updated successfully!"
          : "Category added successfully!"
      );
      setName("");
      setImage(null);
      setIsEditing(false);
      setEditId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error(
        isEditing ? "Failed to update category." : "Failed to add category."
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
          `${process.env.REACT_APP_API_URL}/api/v1/category/delete-category/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Category deleted successfully!");
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category.");
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label>Category Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn">
            {isEditing ? "Update Category" : "Add Category"}
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

      <h3>Category List</h3>
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
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link
                      to={`/categories/subcategories/${cat._id}`}
                      style={{ color: "blue" }}
                    >
                      {cat.name}
                    </Link>
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
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
