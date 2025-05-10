import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const StoreEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [storeData, setStoreData] = useState({
    storeName: "",
    storeAddress: "",
    latitude: "",
    longitude: "",
    zone: "",
    firstName: "",
    lastName: "",
    address_url: "",
    pincode: "",
    state: "",
    city: "",
    logo: null,
    coverPhoto: null,
  });

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/store/details-store/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const store = res.data.data.store;
        setStoreData({
          storeName: store.storeName || "",
          storeAddress: store.storeAddress || "",
          latitude: store.position?.lat || "",
          longitude: store.position?.lng || "",
          zone: store.zone || "",
          firstName: store.sellerAuthId?.userInfo?.firstName || "",
          lastName: store.sellerAuthId?.userInfo?.lastName || "",
          address_url: store.address_url || "",
          pincode: store.pincode || "",
          state: store.state || "",
          city: store.city || "",
          logo: null, // file input
          coverPhoto: null, // file input
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load store details.");
      }
    };

    fetchStore();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in storeData) {
        if (storeData[key]) {
          formData.append(key, storeData[key]);
        }
      }

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/store/edit-store/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Store updated successfully!");
      navigate("/store-list");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update store.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Store</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="storeName" value={storeData.storeName} onChange={handleChange} placeholder="Store Name" />
        <input name="storeAddress" value={storeData.storeAddress} onChange={handleChange} placeholder="Store Address" />
        <input name="latitude" value={storeData.latitude} onChange={handleChange} placeholder="Latitude" />
        <input name="longitude" value={storeData.longitude} onChange={handleChange} placeholder="Longitude" />
        <input name="zone" value={storeData.zone} onChange={handleChange} placeholder="Zone" />
        <input name="firstName" value={storeData.firstName} onChange={handleChange} placeholder="Owner First Name" />
        <input name="lastName" value={storeData.lastName} onChange={handleChange} placeholder="Owner Last Name" />
        <input name="address_url" value={storeData.address_url} onChange={handleChange} placeholder="Google Maps URL" />
        <input name="pincode" value={storeData.pincode} onChange={handleChange} placeholder="Pincode" />
        <input name="state" value={storeData.state} onChange={handleChange} placeholder="State" />
        <input name="city" value={storeData.city} onChange={handleChange} placeholder="City" />

        <div>
          <label>Logo:</label>
          <input type="file" name="logo" onChange={handleFileChange} />
        </div>
        <div>
          <label>Cover Photo:</label>
          <input type="file" name="coverPhoto" onChange={handleFileChange} />
        </div>

        <div className="col-span-2 text-right">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Update Store
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreEdit;
