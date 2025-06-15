import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Autocomplete } from "@react-google-maps/api";
import "./index.css"; // for form styling

const StoreEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const autocompleteRef = useRef(null);

  const [storeData, setStoreData] = useState({
    storeName: "",
    storeAddress: "",
    city: "",
    state: "",
    pincode: "",
    address_url: "",
    latitude: "",
    longitude: "",
    zone: "",
    limitTime: {
      minimum: "",
      maximum: "",
    },
    firstName: "",
    lastName: "",
    logo: null,
    coverPhoto: null,
      ifscCode:"",
      accountNumber:"",
      accountHolderName:"",
      bankName:"",
    password : ""
  });

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const token = localStorage.getItem("token");

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
          logo: null,
          coverPhoto: null,
          limitTime: {
            minimum: store?.limitTime?.minimum,
            maximum: store?.limitTime?.maximum,
          },
          ifscCode:store?.ifscCode,
          accountNumber:store?.accountNumber,
          accountHolderName:store?.accountHolderName,
          bankName:store?.bankName,
          sellerId:store?.sellerAuthId?._id || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load store details.");
      }
    };

    fetchStore();
  }, [id]);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      const components = place.address_components;
      const cityComponent = components.find((c) =>
        c.types.includes("locality")
      );
      const stateComponent = components.find((c) =>
        c.types.includes("administrative_area_level_1")
      );
      const pincodeComponent = components.find((c) =>
        c.types.includes("postal_code")
      );

      const city = cityComponent ? cityComponent.long_name : "";
      const state = stateComponent ? stateComponent.long_name : "";
      const pincode = pincodeComponent ? pincodeComponent.long_name : "";
      const address_url = place.url;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setStoreData((prev) => ({
        ...prev,
        storeAddress: place.formatted_address,
        city,
        state,
        pincode,
        address_url,
        latitude: lat,
        longitude: lng,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in storeData.limitTime) {
      setStoreData((prev) => ({
        ...prev,
        limitTime: { ...prev.limitTime, [name]: value },
      }));
    } else {
      setStoreData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.entries(storeData).forEach(([key, value]) => {
        if (key !== "limitTime" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      // Append limitTime fields explicitly
      if (storeData.limitTime.minimum)
        formData.append("limitTime[minimum]", storeData.limitTime.minimum);
      if (storeData.limitTime.maximum)
        formData.append("limitTime[maximum]", storeData.limitTime.maximum);

      const token = localStorage.getItem("token");

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

  
  const handlePasswordUpdate = async () => {
    if (!storeData.password) return toast.error("Please enter a password");

    try {
      const token = localStorage.getItem("token");
      console.log('storeData?.sellerAuthId0',storeData)
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/store/edit-password/${storeData?.sellerId}`,
        { password: storeData.password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password updated successfully!");
      setStoreData((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to update password.");
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="category-form">
        <fieldset className="form-section">
          <legend>Owner Information</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={storeData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={storeData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Store Information</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Store Name:</label>
              <input
                type="text"
                name="storeName"
                value={storeData.storeName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Zone:</label>
              <input
                type="text"
                name="zone"
                value={storeData.zone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Logo:</label>
              <input type="file" name="logo" onChange={handleFileChange} />
            </div>
            <div className="form-group">
              <label>Cover Photo:</label>
              <input
                type="file"
                name="coverPhoto"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </fieldset>

 {/* Bank Info */}
        <fieldset className="form-section">
          <legend>Bank Information</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Bank Name:</label>
              <input
                type="text"
                name="bankName"
                value={storeData.bankName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Account Holder Name:</label>
              <input
                type="text"
                name="accountHolderName"
                value={storeData.accountHolderName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Account Number:</label>
              <input
                type="text"
                name="accountNumber"
                value={storeData.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>IFSC Code:</label>
              <input
                type="text"
                name="ifscCode"
                value={storeData.ifscCode}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Address & Location</legend>
          <div className="form-grid">
            <Autocomplete
              onLoad={(ref) => (autocompleteRef.current = ref)}
              onPlaceChanged={onPlaceChanged}
              options={{
                componentRestrictions: { country: "in" },
                types: ["establishment"],
              }}
            >
              <div className="form-group">
                <label>Search Shop:</label>
                <input type="text" placeholder="Search..." />
              </div>
            </Autocomplete>

            <div className="form-group">
              <label>Store Address:</label>
              <textarea
                name="storeAddress"
                value={storeData.storeAddress}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                name="city"
                value={storeData.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>State:</label>
              <input
                name="state"
                value={storeData.state}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Pincode:</label>
              <input
                name="pincode"
                value={storeData.pincode}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Latitude:</label>
              <input
                type="number"
                name="latitude"
                value={storeData.latitude}
                onChange={handleChange}
                step="any"
              />
            </div>
            <div className="form-group">
              <label>Longitude:</label>
              <input
                type="number"
                name="longitude"
                value={storeData.longitude}
                onChange={handleChange}
                step="any"
              />
            </div>
            <div className="form-group col-span-2">
              <label>Google Maps URL:</label>
              <input
                name="address_url"
                value={storeData.address_url}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Operating Hours</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Start Time:</label>
              <input
                type="time"
                name="minimum"
                value={storeData.limitTime.minimum}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Close Time:</label>
              <input
                type="time"
                name="maximum"
                value={storeData.limitTime.maximum}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </fieldset>

        <div className="text-right">
          <button type="submit" className="btn">
            Update Store
          </button>
        </div>
        {/* Separate Password Update Section */}
        <fieldset className="form-section">
          <legend>Change Password</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                name="password"
                value={storeData.password}
                onChange={handleChange}
              />
            </div>
          </div>
            {/* <div className="form-group">
              <button
                type="button"
                className="btn"
                onClick={handlePasswordUpdate}
                disabled={!storeData.password}
              >
                Update Password
              </button>
            </div> */}
        </fieldset>
        
        <div className="text-right">
          <button
                type="button"
                className="btn"
                onClick={handlePasswordUpdate}
                disabled={!storeData.password}
              >
                Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreEdit;
