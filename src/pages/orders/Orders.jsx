import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { FaEdit, FaEye, FaStreetView, FaTrash } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { formatToIST } from '../../helper/helper'

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const token = localStorage.getItem("token");

  const fetchOrders = async (page = 1) => {
    try {
      const payload = {
        page,
        limit : pageSize
      }
       const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/order/list-order`, 
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
      })
      const { orders, totalPages, currentPage } = res.data.data;
      setOrders(orders || []);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
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
        <h2>Order List</h2>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Order No</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order?._id}>
                  <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                  <td>{order?.orderNumber}</td>
                  <td>{order?.paymentStatus}</td>
                  <td>
                    {formatToIST(order?.createdAt)}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center", 
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                     <Link
                        to={`/order-details/${order._id}`}
                        className="icon-btn view"
                        title="view"
                      >
                        <FaEye />
                      </Link> 
                    
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No orders found.
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

export default OrderList;
