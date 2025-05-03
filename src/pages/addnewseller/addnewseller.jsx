import React, { useState, useEffect, useRef, useCallback } from "react";
import "./addnewseller.css";
import { LuUserRoundCog } from "react-icons/lu";
import { RiUserFill } from "react-icons/ri";
import { PiWarningCircleBold } from "react-icons/pi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import toast from "react-hot-toast";
import { FaMapLocationDot } from "react-icons/fa6";
import { Button, ListSubheader, InputBase, Box } from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";


const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};


const AddNewSeller = () => {
  // map api
  const [position, setPosition] = useState(defaultCenter);
  const [map, setMap] = useState(null);
  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const handleMapClick = useCallback((event) => {
    setPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  //   change place handle
  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setPosition({ lat, lng });
      map.panTo({ lat, lng });
    }
  };

  const [imagepreview, setImagePreview] = useState(null);
  const [imagelogo, setImageLogo] = useState(null);
  const [datashow, setDatashow] = useState("");
  
  

  const [previewCover, setPreviewCover] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const handleImageCover = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setPreviewCover(URL.createObjectURL(file));
    }
  };

  const [previewLogo, setPreviewLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const handleImageLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const [showMessage, setShowMessage] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }

    setNewStore({ ...newStore, password, confirmPassword: password });
    setShowMessage(true);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newStore.password).then(() => {
      setCopied(true);
    });
  };


  
  let storeToEdit;

  const [newStore, setNewStore] = useState({
    storeName: storeToEdit?.storeName || "",
    storeAddress: storeToEdit?.storeAddress || "",
    storeTaxInfo: storeToEdit?.storeTaxInfo || "",
    zone: storeToEdit?.zone || "",
    logo: storeToEdit?.logo || "",
    coverPhoto: storeToEdit?.coverPhoto || "",
    firstName: storeToEdit?.firstName || "",
    lastName: storeToEdit?.lastName || "",
    mobileNo: storeToEdit?.mobileNo || "",
    email: storeToEdit?.email || "",
    password: storeToEdit?.password || "",
    confirmPassword: storeToEdit?.confirmPassword || "",
  });

  useEffect(() => {
    if (storeToEdit) {
      setNewStore({
        ...newStore,
        storeName: storeToEdit?.storeName || "",
        storeAddress: storeToEdit?.storeAddress || "",
        storeTaxInfo: storeToEdit?.storeTaxInfo || "",
        zone: storeToEdit?.zone || "",
        mapAddress: storeToEdit?.mapAddress || "",
        logo: storeToEdit?.logo || "",
        coverPhoto: storeToEdit?.coverPhoto || "",
        firstName: storeToEdit?.firstName || "",
        lastName: storeToEdit?.lastName || "",
        mobileNo: storeToEdit?.mobileNo || "",
        email: storeToEdit?.email || "",
        password: storeToEdit?.password || "",
        confirmPassword: storeToEdit?.confirmPassword || "",
      });
    }
  }, [storeToEdit]);

  
  
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    try {
      console.log(`REACT_APP_API_URL: ${process.env.REACT_APP_API_URL}`);

      const formData = new FormData();
      for (const key in newStore) {
        formData.append(key, newStore[key]);
      }

     formData.append("position", JSON.stringify(position));


      console.log(`formData72 ${formData}`);
      for (let pair of formData.entries()) {
        console.log(`formData72${pair[0]}: ${pair[1]}`);
      }

      // Add logo file if selected
      if (logoFile) {
        formData.append("logo", logoFile);
      }

      // Add coverPhoto file if selected
      if (coverFile) {
        formData.append("coverPhoto", coverFile);
      }

      let res;
      if (storeToEdit?._id) {
        // Update store
        res = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/store/edit/${storeToEdit._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
      } else {
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        // Add new store
        res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/store/add`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
      }

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      console.log(error);
    }

    // Reset form after submission
    setNewStore({
       storeName: "",
       storeAddress: "",
       storeTaxInfo: "",
       latitude: "",
       longitude: "",
       zone: "",
       mapAddress: "",
       logo: "",
       coverPhoto: "",
       firstName: "",
       lastName: "",
       mobileNo: "",
       email: "",
       password: "",
       confirmPassword: "",
    });
  };
   return isLoaded ? (
     <>
       <div className="addnew-seller-section">
         <div className="addnew-seller-header">
           <form onSubmit={handleAddOrUpdate}>
             <div className="addnew-e-top">
               <div className="addnew-e-heading">
                 <div className="addnew-e-icon">
                   <LuUserRoundCog />
                 </div>
                 <h2>Add New Seller</h2>
               </div>
             </div>
             <div className="e-genral-info-box">
               <div className="e-genral-info">
                 <div className="e-genral-info-top">
                   <div className="e-genral-heading">
                     <div className="e-genral-icon">
                       <RiUserFill />
                     </div>
                     <h3>Genral Infomation</h3>
                   </div>
                 </div>
                 <div className="addnew-e-form-box">
                   <div className="addnew-left">
                     <div className="addnew-left-form">
                       <form onSubmit={handleAddOrUpdate}>
                         <div className="addnew-input-box">
                           <div className="boxf">
                             <label>Store Name</label>
                           </div>
                           <div className="add-input">
                             <input
                               name="storeName"
                               value={newStore.storeName}
                               onChange={(e) =>
                                 setNewStore({
                                   ...newStore,
                                   storeName: e.target.value,
                                 })
                               }
                               type="text"
                               placeholder=" Ex: Store name"
                             />
                           </div>
                         </div>
                         <div className="addnew-input-box">
                           <div className="boxf">
                             <label>Address</label>
                           </div>
                           <div className="add-text">
                             <textarea
                               name="storeAddress"
                               value={newStore.storeAddress}
                               onChange={(e) =>
                                 setNewStore({
                                   ...newStore,
                                   storeAddress: e.target.value,
                                 })
                               }
                               type="text"
                               placeholder=" Ex: Store name"
                             />
                           </div>
                         </div>
                       </form>
                     </div>
                   </div>
                   <div className="addnew-right">
                     <div className="seller-image">
                       <div className="image-e-top">
                         <h4>seller Image Ratio (1:1)</h4>
                       </div>
                       <div className="image-show-box">
                         <div className="show-left">
                           <div className="shoplogo">
                             <h4>Logo</h4>
                           </div>
                           <div className="image-show">
                             <label htmlfor="logofile">
                               {previewLogo ? (
                                 <img
                                   src={previewLogo}
                                   alt="Cover Preview"
                                   style={{
                                     width: "100%",
                                     height: "100%",
                                     objectFit: "cover",
                                   }}
                                 />
                               ) : (
                                 <div
                                   style={{
                                     width: "100%",
                                     height: "100%",
                                     background: "#eee",
                                     display: "flex",
                                     justifyContent: "center",
                                     alignItems: "center",
                                     fontSize: "0.8em",
                                   }}
                                 >
                                   Click to select image
                                 </div>
                               )}
                               <input
                                 type="file"
                                 id="logofile"
                                 onChange={handleImageLogo}
                                 alt=""
                               />
                             </label>
                           </div>
                         </div>
                         <div className="show-left">
                           <div className="shoplogo">
                             <h4>Cover Image</h4>
                           </div>
                           <div className="image-show-cover">
                             <label htmlFor="coverfile">
                               {previewCover ? (
                                 <img
                                   src={previewCover}
                                   alt="Cover Preview"
                                   style={{
                                     width: "100%",
                                     height: "100%",
                                     objectFit: "cover",
                                   }}
                                 />
                               ) : (
                                 <div
                                   style={{
                                     width: "100%",
                                     height: "100%",
                                     background: "#eee",
                                     display: "flex",
                                     justifyContent: "center",
                                     alignItems: "center",
                                     fontSize: "0.8em",
                                   }}
                                 >
                                   Click to select image
                                 </div>
                               )}
                               <input
                                 type="file"
                                 id="coverfile"
                                 onChange={handleImageCover}
                                 alt=""
                               />
                             </label>
                           </div>
                         </div>
                       </div>
                       <div className="image-size">
                         <div className="image-size-heading">
                           <h4> Image Size Max 2 MB *</h4>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="location-info">
                   <div className="seller-location">
                     <div className="location-top">
                       <div className="location-heading">
                         <div className="location-icon">
                           <FaMapLocationDot />
                         </div>
                         <h4>Store Infomation</h4>
                       </div>
                     </div>
                     <div className="location-track-box">
                       <div className="location-track-top">
                         <div className="track-top-left">
                           <div className="city-zone">
                             <label>City</label>
                           </div>
                           <div className="city-input">
                             <Select
                               className="city-select"
                               value={newStore.zone}
                               onChange={(e) =>
                                 setNewStore({
                                   ...newStore,
                                   zone: e.target.value,
                                 })
                               }
                             >
                               <ListSubheader>
                                 <InputBase
                                   type="text"
                                   placeholder="Search city..."
                                   sx={{
                                     width: "100%",
                                     height: 30,
                                     px: 1,
                                     border: "1px solid #ccc",
                                     borderRadius: 1,
                                   }}
                                 />
                               </ListSubheader>
                               <MenuItem
                                 sx={{ color: "#303636" }}
                                 value="Delhi"
                               >
                                 Delhi
                               </MenuItem>
                               <MenuItem
                                 sx={{ color: "#303636" }}
                                 value="Ahmedabad"
                               >
                                 Ahmedabad
                               </MenuItem>
                             </Select>
                           </div>
                         </div>
                         <div className="track-top-right">
                           <div className="mt-7">
                             <Autocomplete
                               onLoad={(autocomplete) =>
                                 (autocompleteRef.current = autocomplete)
                               }
                               onPlaceChanged={onPlaceChanged}
                             >
                               <input
                                 type="text"
                                 placeholder="search location.."
                               />
                             </Autocomplete>
                           </div>
                         </div>
                       </div>
                       <div className="map-track">
                         <div className="map-left">
                           <div className="map-latitude">
                             <div className="map-l">
                               <label>Latitude</label>
                             </div>
                             <div className="map-linput">
                               <input
                                 type="text"
                                 value={position.lat}
                                 readOnly
                               />
                             </div>
                           </div>
                           <div className="map-latitude">
                             <div className="map-l">
                               <label>Longititude</label>
                             </div>
                             <div className="map-linput">
                               <input
                                 type="text"
                                 value={position.lng}
                                 readOnly
                               />
                             </div>
                           </div>
                         </div>
                         <div className="map-right">
                           <GoogleMap
                             mapContainerStyle={containerStyle}
                             center={position}
                             zoom={12}
                             onClick={handleMapClick}
                             onLoad={(mapInstance) => setMap(mapInstance)}
                           >
                             {/* <div className="map-searchbox">
                               <Autocomplete
                                 onLoad={(autocomplete) =>
                                   (autocompleteRef.current = autocomplete)
                                 }
                                 onPlaceChanged={onPlaceChanged}
                               >
                                 <input
                                   type="text"
                                   placeholder="search localtion.."
                                 />
                               </Autocomplete>
                             </div> */}
                             <Marker position={position} />
                           </GoogleMap>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="account-info">
                   <div className="account-epp-info">
                     <div className="account-epp-top">
                       <div className="epp-heading">
                         <div className="epp-icon">
                           <RiUserFill />
                         </div>
                         <h3>Owner information</h3>
                       </div>
                     </div>
                     <div className="e-p-c">
                       <div className="e-box">
                         <div className="e-lable">
                           <lable>First Name</lable>
                         </div>
                         <div className="e-input">
                           <input
                             type="text"
                             name="firstname"
                             value={newStore.firstName}
                             onChange={(e) =>
                               setNewStore({
                                 ...newStore,
                                 firstName: e.target.value,
                               })
                             }
                             placeholder="First Name"
                           />
                         </div>
                       </div>
                       <div className="e-box">
                         <div className="e-lable">
                           <lable>Last Name</lable>
                         </div>
                         <div className="e-input">
                           <input
                             type="text"
                             placeholder="Last Name"
                             name="lastname"
                             value={newStore.lastName}
                             onChange={(e) =>
                               setNewStore({
                                 ...newStore,
                                 lastName: e.target.value,
                               })
                             }
                           />
                         </div>
                       </div>
                       <div className="e-box">
                         <div className="e-lable">
                           <lable>Phone No</lable>
                         </div>
                         <div className="e-input">
                           <input
                             type="number"
                             placeholder="phone.."
                             name="phoneno"
                             value={newStore.mobileNo}
                             onChange={(e) =>
                               setNewStore({
                                 ...newStore,
                                 mobileNo: e.target.value,
                               })
                             }
                           />
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="account-info">
                   <div className="account-epp-info">
                     <div className="account-epp-top">
                       <div className="epp-heading">
                         <div className="epp-icon">
                           <RiUserFill />
                         </div>
                         <h3>Account Information</h3>
                       </div>
                     </div>
                     <div className="e-p-c">
                       <div className="e-box">
                         <div className="e-lable">
                           <lable>Email</lable>
                         </div>
                         <div className="e-input">
                           <input
                             type="email"
                             name="selleremail"
                             placeholder="Ex: exa@gmail.com"
                             value={newStore.email}
                             onChange={(e) =>
                               setNewStore({
                                 ...newStore,
                                 email: e.target.value,
                               })
                             }
                           />
                         </div>
                       </div>
                       <div className="e-box">
                         <div className="e-lable flex items-center gap-2 mb-2">
                           <label className="font-semibold text-gray-700">
                             Password
                           </label>
                           <div className="text-yellow-600">
                             <PiWarningCircleBold />
                           </div>
                         </div>

                         <div className="flex flex-row  gap-2 items-center">
                           <input
                             type="text"
                             placeholder="password"
                             value={newStore.password}
                             onChange={(e) =>
                               setNewStore({
                                 ...newStore,
                                 password: e.target.value,
                               })
                             }
                             className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
                           />

                           <button
                             type="button"
                             onClick={generatePassword}
                             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                           >
                             Generate
                           </button>

                           {newStore.password && (
                             <button
                               type="button"
                               onClick={copyToClipboard}
                               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                             >
                               Copy
                             </button>
                           )}
                         </div>

                         {showMessage && (
                           <div className="mt-3 p-3 bg-yellow-100 flex text-yellow-800 rounded-md text-sm border border-yellow-300 w-full">
                             <p>
                               Please copy the given password for further use.
                             </p>
                             {copied && (
                               <p className="text-green-600 mt-1">
                                 Password copied!
                               </p>
                             )}
                           </div>
                         )}
                       </div>

                       <div className="e-box">
                         <div className="e-lable">
                           <lable>Confirm Password</lable>
                         </div>
                         <div className="e-input">
                           <input
                             type="password"
                             placeholder="confirm password"
                             value={newStore.confirmPassword}
                             onChange={(e) =>
                               setNewStore({
                                 ...newStore,
                                 confirmPassword: e.target.value,
                               })
                             }
                           />
                         </div>
                       </div>
                     </div>
                     <div className="srbtn-box">
                       <div className="r1btn">
                         <Button className="rst-btn">Reset</Button>
                         <Button
                           type="submit"
                           className="subt-btn"
                           onClick={(e) =>
                             handleAddOrUpdate(e, storeToEdit?._id)
                           }
                         >
                           Submit
                         </Button>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </form>
         </div>
       </div>
     </>
   ) : (
     <div>Loading map...</div>
   );
};
export default AddNewSeller;
