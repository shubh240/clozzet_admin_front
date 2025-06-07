import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Autocomplete } from "@react-google-maps/api";
import "./index.css"; // optional for consistent styles

const AddStore = () => {
  const autocompleteRef = useRef(null);

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

      const city = cityComponent ? cityComponent.long_name : null;
      const state = stateComponent ? stateComponent.long_name : null;
      const pincode = pincodeComponent ? pincodeComponent.long_name : null;
      const address_url = place?.url;

      setForm((prev) => ({
        ...prev,
        storeAddress: place.formatted_address,
        city: city,
        state: state,
        pincode: pincode,
        address_url: address_url,
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      }));
    }
  };

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    storeName: "",
    storeAddress: "",
    city: "",
    state: "",
    pincode: "",
    address_url: "",
    zone: "",
    limitTime: {
      minimum: "",
      maximum: "",
    },
    position: {
      lat: "",
      lng: "",
    },
  });

  const [logo, setLogo] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in form.limitTime) {
      setForm((prev) => ({
        ...prev,
        limitTime: { ...prev.limitTime, [name]: value },
      }));
    } else if (name in form.position) {
      setForm((prev) => ({
        ...prev,
        position: { ...prev.position, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    if (logo) formData.append("logo", logo);
    if (coverPhoto) formData.append("coverPhoto", coverPhoto);

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/store/add-store`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Store added successfully!");
      setForm({
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: "",
        password: "",
        confirmPassword: "",
        storeName: "",
        storeAddress: "",
        city: "",
        state: "",
        pincode: "",
        address_url: "",
        zone: "",
        limitTime: {
          minimum: "",
          maximum: "",
        },
        position: {
          lat: "",
          lng: "",
        },
      });
      setLogo(null);
      setCoverPhoto(null);
    } catch (error) {
      console.error("Error adding store:", error);
      toast.error("Failed to add store.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="category-form">
        {/* Owner Info */}
        <fieldset className="form-section">
          <legend>Owner Information</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Mobile No:</label>
              <input
                type="text"
                name="mobileNo"
                value={form.mobileNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Store Info */}
        <fieldset className="form-section">
          <legend>Store Information</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Store Name:</label>
              <input
                type="text"
                name="storeName"
                value={form.storeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Zone:</label>
              <input
                type="text"
                name="zone"
                value={form.zone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Logo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogo(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <label>Cover Photo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverPhoto(e.target.files[0])}
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
                value={form.bankName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Account Holder Name:</label>
              <input
                type="text"
                name="accountHolderName"
                value={form.accountHolderName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Account Number:</label>
              <input
                type="text"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>IFSC Code:</label>
              <input
                type="text"
                name="ifscCode"
                value={form.ifscCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Address & Map */}
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
                <input
                  type="text"
                  name="Search Shop"
                  onChange={handleChange}
                  required
                />
              </div>
            </Autocomplete>

            <div className="form-group">
              <label>Store Address:</label>
              <textarea
                name="storeAddress"
                value={form.storeAddress}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Pincode:</label>
              <input
                type="number"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Latitude:</label>
              <input
                type="number"
                name="lat"
                value={form.position.lat}
                onChange={handleChange}
                step="any"
                required
              />
            </div>
            <div className="form-group">
              <label>Longitude:</label>
              <input
                type="number"
                name="lng"
                value={form.position.lng}
                onChange={handleChange}
                step="any"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Store Timing */}
        <fieldset className="form-section">
          <legend>Operating Hours</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Start Time:</label>
              <input
                type="time"
                name="minimum"
                value={form.limitTime.minimum}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Close Time:</label>
              <input
                type="time"
                name="maximum"
                value={form.limitTime.maximum}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn">
          Add Store
        </button>
      </form>
    </div>
  );
};

export default AddStore;
