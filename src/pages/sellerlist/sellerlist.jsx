import React from "react";
import "./sellerlist.css";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";
import { Button, MenuItem, Select } from "@mui/material";
import { LuUserRoundCog } from "react-icons/lu";
import { CgAdd } from "react-icons/cg";
import { Link } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import useGetStores from "../../hooks/useGetStores";
import { useSelector } from "react-redux";
import { selectStores } from "../../redux/selectors";
import Switch from '@mui/material/Switch';
import { FaPenClip } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";

const SellerList = () => {

    useGetStores();
    const stores = useSelector(selectStores);
    console.log("stores", stores);

  return (
    <>
      <div className="seller-list-section">
        <div className="seller-list-header">
          <div className="seller-list-top">
            <div className="seller-heading">
              <div className="seller-icon">
                <LuUserRoundCog />
              </div>
              <h2>Seller List</h2>
              <div className="seller-count">
                <h4>{stores?.stores?.length}</h4>
              </div>
            </div>
            <div className="add-btn-seller">
              <Link to="/addnewseller">
                {" "}
                <Button>
                  <div className="a-btn-e-icon">
                    <CgAdd />
                  </div>
                  Add New seller
                </Button>
              </Link>
            </div>
          </div>
          <div className="seller-cart-box">
            <div className="seller-cart-part1">
              <div className="cart-sellerlist">
                <div className="count-image">
                  <div className="count-data">
                    <h4>15</h4>
                  </div>
                  <div className="cart-image-box">
                    <img src="./images/sellerstore.png" alt="" />
                  </div>
                </div>
                <div className="cart-box-name">
                  <h4>Total Stores</h4>
                </div>
              </div>
              <div className="cart-sellerlist">
                <div className="count-image">
                  <div className="count-data">
                    <h4>15</h4>
                  </div>
                  <div className="cart-image-box">
                    <img src="./images/storeopen.png" alt="" />
                  </div>
                </div>
                <div className="cart-box-name">
                  <h4>Active Stores</h4>
                </div>
              </div>
              <div className="cart-sellerlist">
                <div className="count-image">
                  <div className="count-data">
                    <h4>15</h4>
                  </div>
                  <div className="cart-image-box">
                    <img src="./images/storeclose.png" alt="" />
                  </div>
                </div>
                <div className="cart-box-name">
                  <h4>Inactive Stores</h4>
                </div>
              </div>
              <div className="cart-sellerlist">
                <div className="count-image">
                  <div className="count-data">
                    <h4>15</h4>
                  </div>
                  <div className="cart-image-box">
                    <img src="./images/addstore.png" alt="" />
                  </div>
                </div>
                <div className="cart-box-name">
                  <h4>Newly joined Stores</h4>
                </div>
              </div>
            </div>
            <div className="seller-cart-part2">
              <ul>
                <li>Total transactions 11</li>|
                <li>Commission earned $ 2,608.83</li>|
                <li>Total store withdraws $ 3,500.00</li>
              </ul>
            </div>
          </div>
          <div className="seller-list-box">
            <div className="seller-list-table">
              <div className="seller-table-top">
                <div className="select-zone">
                  <Select className="selectlistzone">
                    <MenuItem>Dehli</MenuItem>
                    <MenuItem>Dehli</MenuItem>
                    <MenuItem>Dehli</MenuItem>
                  </Select>
                </div>
                <div className="s-btn">
                  <div className="s-input">
                    <input type="text" placeholder="Search By name or email" />
                    <div className="icon-s">
                      <IoSearchSharp />
                    </div>
                  </div>
                  <div className="ex-select">
                    <Button className="e-btn">
                      <span>
                        <MdFileDownload />
                      </span>
                      Export
                      <span>
                        <IoIosArrowDown />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="main-slist-table">
                <table width="100%">
                  <thead>
                    <tr>
                      <th>SI</th>
                      <th>Store Information</th>
                      <th>Owner Information</th>
                      <th>Zone</th>
                      <th>Featured</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stores?.stores?.map((store, index) => (
                      <tr key={store._id}>
                        <td>{index + 1}</td>
                        <td>
                          <div>{store.storeName}</div>
                        </td>
                        <td>
                          {store?.sellerAuthId?.userInfo
                            ? `${store.sellerAuthId.userInfo.firstName} ${store.sellerAuthId.userInfo.lastName}`
                            : "N/A"}
                        </td>
                        <td>{store.zone}</td>
                        <td>
                          <label>
                            <Switch
                              // checked={category.categoryStatus}
                              // onChange={(e) => {
                              //   e.preventDefault();
                              //   handleToggleStatus(category._id);
                              // }}
                            />
                          </label>
                        </td>
                        <td>
                          <label>
                            <Switch
                              // checked={category.featured}
                              // onChange={(e) => {
                              //   e.preventDefault();
                              //   handleToggleFeatured(category._id);
                              // }}
                            />
                          </label>
                        </td>
                        <td className="ac-box">
                          <Link to="/view">
                            <Button className="eypen">
                              <LuEye />
                            </Button>
                          </Link>
                          <Button className="eypen">
                            <FaPenClip />
                          </Button>
                          <Button className="eypen">
                            <AiOutlineDelete />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SellerList;
