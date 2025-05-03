import React, { useCallback, useState, useRef } from "react";
import './overview.css'
import { FaShop } from "react-icons/fa6";
import { Button } from "@mui/material";
import { FaPenClip } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { IoMapSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdAddBusiness } from "react-icons/md";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    Autocomplete,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const defaultCenter = {
    lat: 40.7128,
    lng: -74.006,
};

const Overview = () => {
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
    return isLoaded ? (
        <>
            <div className="listview-section">
                <div className="listview-header">
                    <div className="listview-top">
                        <div className="listview-top-left">
                            <div className="listview-heading">
                                <div className="top-viewicon" >
                                    <FaShop />
                                </div>
                                <h2>Eco Market</h2>
                            </div>
                        </div>
                        <div className="listview-top-right">
                            <div className="editbtn-store">
                                <Link to='/addnewseller'>
                                    <Button>
                                        <FaPenClip />
                                        Edit Store
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="all-view-section-lists">
                        <ul>
                            <li>Overview</li>
                            <li>Orders</li>
                            <li>Items</li>
                            <li>Reviews</li>
                            <li>Descounts</li>
                            <li>Transactions</li>
                            <li>Settings</li>
                            <li>Converstatics</li>
                            <li>Meta Data</li>
                            <li>Disbursements</li>
                            <li>Business</li>

                        </ul>
                    </div>
                    <div className="overview-cart-box">
                        <div className="able-balance">
                            <div className="w-a-b">
                                <div className="w-ab-heading">
                                    <h3>Withdraw Able Balance</h3>
                                </div>
                                <div className="rupy">
                                    <div className="rupy-img">
                                        <img src="./images/money.png" alt="" />
                                    </div>
                                    <h1>$ 0</h1>
                                </div>
                                <div className="r-w-heading">
                                    <Button>Request Withdraw</Button>
                                </div>
                            </div>
                        </div>
                        <div className="pwct">
                            <div className="pw-box">
                                <div className="cart1">
                                    <div className="confirem-icon">
                                        <div className="zero">
                                            <h2> $ 0</h2>
                                        </div>

                                        <div className="pwct-icon">
                                            <img src="./images/wallet.png" alt="" />
                                        </div>

                                    </div>
                                    <div className="confirem-info">


                                        <h4>Pending Withdraw</h4>

                                    </div>
                                </div>
                                <div className="cart2">
                                    <div className="confirem-icon">
                                        <div className="zero">
                                            <h2> $ 0</h2>
                                        </div>

                                        <div className="pwct-icon">
                                            <img src="./images/cash-withdrawal.png" alt="" />
                                        </div>

                                    </div>
                                    <div className="confirem-info">


                                        <h4> Total Withdrawn Amount</h4>

                                    </div>
                                </div>
                            </div>
                            <div className="pw-box">
                                <div className="cart3">
                                    <div className="confirem-icon">
                                        <div className="zero">
                                            <h2>$ 0</h2>
                                        </div>

                                        <div className="pwct-icon">
                                            <img src="./images/total01.png" alt="" />
                                        </div>

                                    </div>
                                    <div className="confirem-info">


                                        <h4>Withdraw able balance</h4>

                                    </div>
                                </div>
                                <div className="cart4">
                                    <div className="confirem-icon">
                                        <div className="zero">
                                            <h2> $ 0</h2>
                                        </div>

                                        <div className="pwct-icon">
                                            <img src="./images/earn-money.png" alt="" />
                                        </div>

                                    </div>
                                    <div className="confirem-info">


                                        <h4>Total earning</h4>

                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                    <div className="store-location-info-box">
                        <div className="viewstore-info">
                            <div className="viewstore-info-top">
                                <div className="viewstore-info-top-heading">
                                    <div className="viewstore-info-icon">
                                        <FaShop />
                                    </div>
                                    <h3>Store Info</h3>
                                </div>
                            </div>
                            <div className="store-map-info">
                                <div className="store-map-info-left">
                                    <div className="store-image-info-box">
                                        <div className="main-store-image">
                                            <img src="./images/stores.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="main-store-details">
                                        <div className="main-store-details-heading">
                                            <h3>Eco Market</h3>
                                        </div>
                                        <div className="all-map-details">
                                            <div className="media-icon">
                                                <FaBuilding />
                                            </div>
                                            <h3>Adress:   <span>
                                                House: 00, Road: 00, City-000, Country</span></h3>
                                        </div>
                                        <div className="all-map-details">
                                            <div className="media-icon">
                                                <MdEmail />
                                            </div>
                                            <h3>Email : <span>
                                                demo@***gamil.com</span></h3>
                                        </div>
                                        <div className="all-map-details">
                                            <div className="media-icon">
                                                <FiPhoneCall />
                                            </div>
                                            <h3>Phone  : <span>
                                                +91*******</span></h3>
                                        </div>
                                        <div className="all-map-details">
                                            <div className="media-icon">
                                                <IoMapSharp />
                                            </div>
                                            <h3>Zone:  <span>
                                                House: 00</span></h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="store-map-info-right">

                                    <div className="google-map-show">
                                        <GoogleMap
                                            mapContainerStyle={containerStyle}
                                            center={position}
                                            zoom={12}
                                            onClick={handleMapClick}
                                            onLoad={(mapInstance) => setMap(mapInstance)}
                                        >
                                            <div className="map-searchbox">
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
                                            </div>
                                            <Marker position={position} />
                                        </GoogleMap>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="store-owner-info-box">
                        <div className="store-owner-info-left">
                            <div className="store-owner-top">
                                <div className="store-owner-top-heading">
                                    <div className="owner-top-icon">
                                        <FaUser />
                                    </div>
                                    <h3>Store Owner</h3>
                                </div>
                                <div className="owner-details-left">
                                    <div className="owner-image">
                                        <div className="main-owner-image">

                                        </div>
                                    </div>
                                    <div className="owner-part">
                                        <div className="owner-emails">
                                            <MdEmail />
                                            <h3>Email: <span>gmails*****.com</span></h3>
                                        </div>
                                        <div className="owner-emails">
                                            <FiPhoneCall />
                                            <h2>Phone: <span>+91 *******</span></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="store-owner-info-left">
                            <div className="store-owner-top">
                                <div className="store-owner-top-heading">
                                    <div className="owner-top-icon">
                                        <MdAddBusiness />
                                    </div>
                                    <h3>Store Owner</h3>
                                </div>
                                <div className="business-plane">

                                    <div className="owner-part">
                                        <div className="owner-emails">

                                            <h3>Business Plan
                                                :
                                                Unsubscribed </h3>
                                        </div>
                                        <div className="owner-emails">
                                          
                                            <h2>Package name
                                                :
                                                Basic</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    ) : (
        <div>Loading map...</div>
    );
}
export default Overview;