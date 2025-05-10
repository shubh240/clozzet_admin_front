import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./index.css";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const token = localStorage.getItem("token");

  const fetchStores = async (page = 1) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/store/list-stores?page=${page}&limit=${pageSize}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { stores, totalPages, currentPage } = res.data.data;
      setStores(stores || []);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
    } catch (error) {
      console.error("Error fetching stores:", error);
      toast.error("Failed to fetch stores.");
    }
  };

  useEffect(() => {
    fetchStores(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
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
          `${process.env.REACT_APP_API_URL}/api/v1/store/delete-store/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Store deleted successfully!");
        fetchStores(currentPage); // Refresh list
      } catch (error) {
        console.error("Error deleting store:", error);
        toast.error("Failed to delete store.");
      }
    }
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2>Store List</h2>
        <Link to="/store-add" className="add-store-btn">
          + Add Store
        </Link>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Store Name</th>
              <th>Owner</th>
              <th>Email</th>
              <th>City</th>
              <th>Logo</th>
              <th>Timings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.length > 0 ? (
              stores.map((store, index) => (
                <tr key={store._id}>
                  <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                  <td>{store.storeName}</td>
                  <td>
                    {store.sellerAuthId?.userInfo?.firstName}{" "}
                    {store.sellerAuthId?.userInfo?.lastName}
                  </td>
                  <td>{store.sellerAuthId?.userAuth?.email}</td>
                  <td>{store?.city}</td>
                  <td>
                    <img
                      src={store.logoUrl}
                      alt="logo"
                      style={{ width: "40px", borderRadius: "4px" }}
                    />
                  </td>
                  <td>
                    {store.limitTime?.minimum} - {store.limitTime?.maximum}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                     <Link
                        to={`/store-edit/${store._id}`}
                        className="icon-btn edit"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link> 
                      <button
                        onClick={() => handleDelete(store._id)}
                        className="icon-btn delete"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No stores found.
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

export default StoreList;
