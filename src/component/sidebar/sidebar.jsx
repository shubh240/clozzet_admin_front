import React, { useState } from "react";
import "./sidebar.css";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleDropmenu, setIsToggleDropmenu] = useState(false);

  const isOpenDropmenu = (index) => {
    setActiveTab(index);
    setIsToggleDropmenu(!isToggleDropmenu);
  };
  return (
    <>
      <div className="sidebar-section">
        <ul>
          <li>
            <Link to="/dashboard">
              <Button sx={{
                backgroundColor: activeTab === 0 ? '#2c4df2' : 'transparent',
                color: activeTab === 0 ? '#fff' : '#000',
                justifyContent: 'flex-start',
                textTransform: 'none',
                width: '100%',
                padding: '10px 15px',
                '&:hover': {
                  backgroundColor: activeTab === 0 ? '#2c4df2' : '#f0f0f0',
                },
              }}>
                <span className="side-icon">
                  <MdDashboard />
                </span>
                Dashboard
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/admin">
              <Button >
                <span className="side-icon">
                  <FaUser />
                </span>
                Admin
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className={`${activeTab === 1 ? "active" : ""}`}
              onClick={() => isOpenDropmenu(1)}
            >
              <span className="side-icon">
                <IoMdPersonAdd />
              </span>
              Seller Section
              <span className="arrow">
                <IoIosArrowForward />
              </span>
            </Button>
            <div
              className={`dropmenuwraper  ${activeTab === 1 && isToggleDropmenu === true
                ? "colapse"
                : "colapsed"
                }`}
            >
              <ul className="dropmenu">
                <li>
                  <Link to="/addnewseller">Add New Seller</Link>
                </li>
                <li>
                  <Link to="sellerlist">Seller list</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Button
              className={`${activeTab === 2 ? "active" : ""}`}
              onClick={() => isOpenDropmenu(2)}
            >
              <span className="side-icon">
                <IoMdPersonAdd />
              </span>
              order Management
              <span className="arrow">
                <IoIosArrowForward />
              </span>
            </Button>
            <div
              className={`dropmenuwraper  ${activeTab === 2 && isToggleDropmenu === true
                ? "colapse"
                : "colapsed"
                }`}
            >
              <ul className="dropmenu">
                <li>
                  <Link to="/addnewseller">All</Link>
                </li>
                <li>
                  <Link to="sellerlist">Scheduled</Link>
                </li>
                <li>
                  <Link to="sellerlist">Accepted</Link>
                </li>
                <li>
                  <Link to="sellerlist">Order on the Way</Link>
                </li>
                <li>
                  <Link to="sellerlist">Delivered</Link>
                </li>
                <li>
                  <Link to="sellerlist">Canceled</Link>
                </li>
                <li>
                  <Link to="sellerlist">Payment Failed</Link>
                </li>
                <li>
                  <Link to="sellerlist">Refunded</Link>
                </li>
                <li>
                  <Link to="sellerlist">offline Payments</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Button
              className={`${activeTab === 3 ? "active" : ""}`}
              onClick={() => isOpenDropmenu(3)}
            >
              <span className="side-icon">
                <IoMdPersonAdd />
              </span>
              Permotion Management
              <span className="arrow">
                <IoIosArrowForward />
              </span>
            </Button>
            <div
              className={`dropmenuwraper  ${activeTab === 3 && isToggleDropmenu === true
                ? "colapse"
                : "colapsed"
                }`}
            >
              <ul className="dropmenu">
                <li>
                  <Link to="/addnewseller">Banners</Link>
                </li>
                <li>
                  <Link to="banners">Other Banners</Link>
                </li>
                <li>
                  <Link to="banners">Coupons</Link>
                </li>
                <li>
                  <Link to="banners">Push Notificaion</Link>
                </li>
                <li>
                  <Link to="banners">Advertisement</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div >
    </>
  );
};

export default Sidebar;
