import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEdit, FaToggleOn } from "react-icons/fa";
import Swal from "sweetalert2";
import "./Config.css";

const Configs = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [configs, setConfigs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchConfigs = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/config/list-config`,
        {
          params: search ? { name: search } : {},
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setConfigs(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch configs");
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !value) {
      toast.error("Both name and value are required.");
      return;
    }

    const payload = { name, value };

    const url = isEditing
      ? `${process.env.REACT_APP_API_URL}/api/v1/config/edit-config/${editId}`
      : `${process.env.REACT_APP_API_URL}/api/v1/config/add-config`;

    const method = isEditing ? axios.put : axios.post;

    try {
      await method(url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(isEditing ? "Config updated" : "Config added");
      setName("");
      setValue("");
      setIsEditing(false);
      setEditId(null);
      fetchConfigs();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/config/status-config/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Status updated");
      fetchConfigs();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleEdit = async (config) => {
    setIsEditing(true);
    setEditId(config._id);
    setName(config.name);
    setValue(config.value);
  };

  return (
    <div className="container">
      <h2>{isEditing ? "Edit Config" : "Add Config"}</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label>Config Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Value:</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div className="button-group">
          <button className="btn" type="submit">
            {isEditing ? "Update" : "Add"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn cancel"
              onClick={() => {
                setIsEditing(false);
                setName("");
                setValue("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr />

      <h3>Config List</h3>
      <input
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table-wrapper">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {configs.length ? (
            configs.map((conf, i) => (
              <tr key={conf._id}>
                <td>{i + 1}</td>
                <td>{conf.name}</td>
                <td>{conf.value}</td>
                <td>
                  <button
                    className="icon-btn edit"
                    onClick={() => handleEdit(conf)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No config found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Configs;
