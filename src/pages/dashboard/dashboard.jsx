import React from "react";
import './dashboard.css'
import { MdDashboard } from "react-icons/md";

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Link} from 'react-router-dom';


const DashboardPage = () => {
    return (
        <>
            <div className="dashboard-section">
                <div className="dashboard-header">
                    <div className="dashboard-top">
                        <div className="dashboard-left">
                            <div className="dashboard-heading">
                                <div className="top-dash-icon">
                                    <MdDashboard />
                                </div>
                                <div className="dash-heading-para">
                                    <h2>Dashboard</h2>
                                    <p>Hello Here You Can Manage Your  Orders by Zone.</p>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-right">
                            <div className="add-inputs">
                                <div className="select-menu">
                                    <FormControl className="f-bg" size="small"  fullWidth  >
                                       
                                        <Select  name="role">

                                            <MenuItem className="menusize" value="">None</MenuItem>
                                            <MenuItem value="customer">Dehli</MenuItem>
                                            <MenuItem value="deliverymen">UP</MenuItem>

                                        </Select>
                                    </FormControl>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-cart-section">
                        <div className="dashboard-cart-box">
                            <div className="cart-part1">
                                <div className="cart-1">
                                    <div className="cart-img">
                                        <div className="item-img">
                                            <img src="./images/items.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="cart-items"><p>items</p></div>
                                    <div className="count-item"><h3>30</h3></div>
                                    <div className="newitemadd"><p>0 Newly  added</p></div>
                                </div>
                                <div className="cart-1">
                                    <div className="cart-img">
                                        <div className="item-img">
                                            <img src="./images/shopping.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="cart-items"><p>Orders</p></div>
                                    <div className="count-item"><h3>30</h3></div>
                                    <div className="newitemadd"><p>0 Newly  added</p></div>
                                </div>
                                <div className="cart-1">
                                    <div className="cart-img">
                                        <div className="item-img">
                                            <img src="./images/stores.png" alt="" />

                                        </div>
                                    </div>
                                    <div className="cart-items"><p>Stores</p></div>
                                    <div className="count-item"><h3>30</h3></div>
                                    <div className="newitemadd"><p>0 Newly  added</p></div>
                                </div>
                                <div className="cart-1">
                                    <div className="cart-img">
                                        <div className="item-img">
                                            <img src="./images/customer.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="cart-items"><p>Customers</p></div>
                                    <div className="count-item"><h3>30</h3></div>
                                    <div className="newitemadd"><p>0 Newly  added</p></div>
                                </div>
                            </div>
                            <div className="cart-part2">
                                <div className="uapu-part1">

                                    <div className="uapu1">
                                        <div className="dlinfo">
                                            <div className="line">
                                                <img src="./images/qa.png" alt="" />
                                            </div> <h4>Unassigned Orders</h4>
                                        </div>
                                        <div className="dlcount">
                                            <h2>0</h2>
                                        </div>
                                    </div>
                                    <div className="uapu1">
                                        <div className="dlinfo">
                                            <div className="line">
                                                <img src="./images/mobile-payment.png" alt="" />
                                            </div> <h4>Accepted By Delivery Man</h4>
                                        </div>
                                        <div className="dlcount">
                                            <h2>0</h2>
                                        </div>
                                    </div>
                                    <div className="uapu1">
                                        <div className="dlinfo">
                                            <div className="line">
                                                <img src="./images/bundling.png" alt="" />
                                            </div> <h4>Packaging</h4>
                                        </div>
                                        <div className="dlcount">
                                            <h2>0</h2>
                                        </div>
                                    </div>
                                    <div className="uapu1">
                                        <div className="dlinfo">
                                            <div className="line">
                                                <img src="./images/product-out.png" alt="" />
                                            </div> <h4>Out for delivery</h4>
                                        </div>
                                        <div className="dlcount">
                                            <h2>0</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="uapu-part1">

                                    <div className="uapu1">
                                        <div className="dlinfo">
                                            <div className="line">
                                                <img src="./images/complete.png" alt="" />
                                            </div> <h4>Delivered</h4>
                                        </div>
                                        <div className="dlcount">
                                            <h2>0</h2>
                                        </div>
                                    </div>
                                    <div className="uapu1">
                                        <div className="dlinfo">
                                            <div className="line">
                                                <img src="./images/multiply.png" alt="" />
                                            </div> <h4>Canceled</h4>
                                        </div>
                                        <div className="dlcount">
                                            <h2>0</h2>
                                        </div>
                                    </div>
                                    <div className="uapu1">
                                        <div className="dlinfo">
                                            <div className="line">
                                                <img src="./images/money-back.png" alt="" />
                                            </div> <h4>Refunded</h4>
                                        </div>
                                        <div className="dlcount">
                                            <h2>0</h2>
                                        </div>
                                    </div>
                                    <div className="uapu1">
                                        <div className="dlinfo">
                                            <div className="line">
                                                <img src="./images/payfailed.png" alt="" />
                                            </div> <h4>Payment Failed</h4>
                                        </div>
                                        <div className="dlcount">
                                            <h2>0</h2>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="view-section">
                        <div className="top-selling-1">
                            <div className="top-selling-head">
                                <div className="top-sell-heading">
                                    <h4>Top selling stores</h4>
                                </div>
                                <div className="view-link">
                                    <Link to="#">view all</Link>
                                </div>
                            </div>
                            <div className="top-selling-body">
                                <div className="top-stores-box">
                                    <div className="top-cart-stores">
                                        <div className="top-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                        </div>
                                    </div>
                                    <div className="top-cart-stores">
                                        <div className="top-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                        </div>
                                    </div>
                                    <div className="top-cart-stores">
                                        <div className="top-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                        </div>
                                    </div>
                                    <div className="top-cart-stores">
                                        <div className="top-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                        </div>
                                    </div>
                                    <div className="top-cart-stores">
                                        <div className="top-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                        </div>
                                    </div>
                                    <div className="top-cart-stores">
                                        <div className="top-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                        </div>
                                    </div>
                                    <div className="top-cart-stores">
                                        <div className="top-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                        </div>
                                    </div>
                                  
                                    
                                </div>
                               
                               
                            </div>

                        </div>
                        <div className="top-popular">
                            <div className="top-selling-head">
                                <div className="top-heading">
                                    <h4>Most Popular stores</h4>
                                </div>
                                <div className="view-link">
                                    <Link to="#">view all</Link>
                                </div>
                            </div>
                            <div className="top-selling-body">
                                <div className="top-stores-box">
                                    
                                    <div className="popular-s-box">
                                        <div className="popular-carts">
                                            <div className="popular-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                            </div>
                                            <div className="shops-name">
                                            <h4>Smart Shopping</h4>
                                            </div>
                                            
                                            <div className="like-box">
                                                <div className="like-count">
                                                   <h4>4</h4>
                                                    </div>
                                                    <div className="like-img">
                                                        <img src="./images/heart.png" alt=""/>
                                                    </div>
                                               
                                            </div>

                                        </div>
                                        <div className="popular-carts">
                                        <div className="popular-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                            </div>
                                            <div className="shops-name">
                                            <h4>Smart Shopping</h4>
                                            </div>
                                            
                                            <div className="like-box">
                                                <div className="like-count">
                                                   <h4>4</h4>
                                                    </div>
                                                    <div className="like-img">
                                                        <img src="./images/heart.png" alt=""/>
                                                    </div>
                                               
                                            </div>
                                            </div>
                                            <div className="popular-carts">
                                            <div className="popular-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                            </div>
                                            <div className="shops-name">
                                            <h4>Smart Shopping</h4>
                                            </div>
                                            
                                            <div className="like-box">
                                                <div className="like-count">
                                                   <h4>4</h4>
                                                    </div>
                                                    <div className="like-img">
                                                        <img src="./images/heart.png" alt=""/>
                                                    </div>
                                               
                                            </div>
                                            </div>
                                            <div className="popular-carts">
                                            <div className="popular-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                            </div>
                                            <div className="shops-name">
                                            <h4>Smart Shopping</h4>
                                            </div>
                                            
                                            <div className="like-box">
                                                <div className="like-count">
                                                   <h4>4</h4>
                                                    </div>
                                                    <div className="like-img">
                                                        <img src="./images/heart.png" alt=""/>
                                                    </div>
                                               
                                            </div>
                                            </div>
                                           
                                    </div>
                                  
                                    
                                </div>
                               
                               
                            </div>

                        </div>

                        <div className="top-selling-item">
                        <div className="top-selling-head">
                                <div className="top-heading">
                                    <h4>Top Selling items</h4>
                                </div>
                                <div className="view-link">
                                    <Link to="#">view all</Link>
                                </div>
                            </div>
                            <div className="top-selling-body">
                            <div className="top-item-box">
                                    
                                    <div className="popular-s-box">
                                        <div className="popular-carts">
                                            <div className="popular-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                            </div>
                                            <div className="item-name">
                                            <h4>Smart Shopping</h4>
                                            </div>
                                            
                                            <div className="sold-box">
                                                <div className="sold-count">
                                                    <h4>sold: 3</h4>
                                                </div>
                                               
                                            </div>

                                        </div>
                                        <div className="popular-carts">
                                            <div className="popular-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                            </div>
                                            <div className="item-name">
                                            <h4>Smart Shopping</h4>
                                            </div>
                                            
                                            <div className="sold-box">
                                                <div className="sold-count">
                                                    <h4>sold: 3</h4>
                                                </div>
                                               
                                            </div>

                                        </div>
                                        <div className="popular-carts">
                                            <div className="popular-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                            </div>
                                            <div className="item-name">
                                            <h4>Smart Shopping</h4>
                                            </div>
                                            
                                            <div className="sold-box">
                                                <div className="sold-count">
                                                    <h4>sold: 3</h4>
                                                </div>
                                               
                                            </div>

                                        </div>
                                        
                                          
                                          
                                           
                                    </div>
                                  
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rated-delivery-customer">
                    <div className="top-rated-item">
                        <div className="top-rated-head">
                                <div className="top-heading">
                                    <h4>Top Rated items</h4>
                                </div>
                                <div className="view-link">
                                    <Link to="#">view all</Link>
                                </div>
                            </div>
                            <div className="top-rated-body">
                            <div className="top-item-box">
                                    
                                    <div className="rated-s-box">
                                        <div className="rated-carts">
                                            <div className="popular-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                            </div>
                                            <div className="item-name">
                                            <h4>Smart Shopping</h4>
                                           
                                            </div>
                                            
                                            <div className="rated-box">
                                            <div className="like-count">
                                                   <h4>4</h4>
                                                    </div>
                                                    <div className="like-img">
                                                        <img src="./images/star.png" alt=""/>
                                                    </div>
                                               
                                            </div>

                                        </div>
                                      
                                        
                                        
                                          
                                          
                                           
                                    </div>
                                  
                                    
                                </div>
                            </div>
                        </div>
                        <div className="top-rated-men">
                        <div className="top-rated-head">
                                <div className="top-heading">
                                    <h4>Top Deliveryman</h4>
                                </div>
                                <div className="view-link">
                                    <Link to="#">view all</Link>
                                </div>
                            </div>
                            <div className="top-rated-body">
                            <div className="top-item-box">
                                    
                                    <div className="rated-s-box">
                                        <div className="rated-carts">
                                            <div className="popular-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                            </div>
                                            <div className="item-name-number">
                                            <h4>Smart Shopping</h4>
                                            <p>+91*********</p>
                                            </div>
                                            
                                            <div className="sold-box">
                                                <div className="sold-count">
                                                    <h4>Orders: 13</h4>
                                                </div>
                                               
                                            </div>

                                        </div>
                                      
                                        
                                        
                                          
                                          
                                           
                                    </div>
                                  
                                    
                                </div>
                            </div>
                        </div>
                        <div className="top-rated-men">
                        <div className="top-rated-head">
                                <div className="top-heading">
                                    <h4>Top Deliveryman</h4>
                                </div>
                                <div className="view-link">
                                    <Link to="#">view all</Link>
                                </div>
                            </div>
                            <div className="top-rated-body">
                            <div className="top-item-box">
                                    
                                    <div className="rated-s-box">
                                        <div className="rated-carts">
                                            <div className="popular-s-img">
                                            <img src="./images/shop.png"  alt=""/>
                                            </div>
                                            <div className="item-name-number">
                                            <h4>Smart Shopping</h4>
                                            <p>+91*********</p>
                                            </div>
                                            
                                            <div className="sold-box">
                                                <div className="sold-count">
                                                    <h4>Orders: 13</h4>
                                                </div>
                                               
                                            </div>

                                        </div>
                                      
                                        
                                        
                                          
                                          
                                           
                                    </div>
                                  
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DashboardPage;