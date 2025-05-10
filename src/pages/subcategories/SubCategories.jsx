import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import "./Categories.css";

const SubCategories = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subCategories.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(subCategories.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { category } = useParams(); // category ID from URL
  const token = localStorage.getItem("token");

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/subCategory/list-sub-category`,
        {
          params: {
            category: category, // categoryId should come from useParams()
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubCategories(res.data.data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast.error("Failed to load subcategories.");
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return toast.error("Please enter a subcategory name.");
    if (!image && !isEditing) return toast.error("Please select an image.");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    if (image) formData.append("image", image);

    const url = isEditing
      ? `${process.env.REACT_APP_API_URL}/api/v1/subCategory/edit-sub-category/${editId}`
      : `${process.env.REACT_APP_API_URL}/api/v1/subCategory/add-sub-category`;

    try {
      const method = isEditing ? axios.put : axios.post;
      await method(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(isEditing ? "Subcategory updated!" : "Subcategory added!");
      setName("");
      setImage(null);
      setIsEditing(false);
      setEditId(null);
      fetchSubCategories();
    } catch (error) {
      console.error("Error saving subcategory:", error);
      toast.error("Failed to save subcategory.");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the subcategory.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/v1/subCategory/delete-sub-category/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Subcategory deleted!");
        fetchSubCategories();
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        toast.error("Failed to delete subcategory.");
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label>Subcategory Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Subcategory Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn">
            {isEditing ? "Update Subcategory" : "Add Subcategory"}
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

      <h3>Subcategory List</h3>
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
            {currentItems.length > 0 ? (
              currentItems.map((sub, index) => (
                <tr key={sub._id}>
                  <td>{index + 1}</td>
                  <td>{sub.name}</td>
                  <td>
                    {sub.image && (
                      <img
                        src={sub.image}
                        alt={sub.name}
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
                        setEditId(sub._id);
                        setName(sub.name);
                        setImage(null);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="icon-btn delete"
                      title="Delete"
                      onClick={() => handleDelete(sub._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No subcategories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategories;
