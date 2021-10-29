import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import {GrCart} from 'react-icons/gr';
import {useState} from 'react';


const Navbar = ({fetch_cart, cartlength, ArrangeCategory, apicheck}) =>{
   
    return(
        <div className="navbar">
            <Link to="/">
                <a>Store</a>
            </Link>
            <div className="Category_Cart_div">
                <p>Arrange By Category</p>
            <label class="switch">
              <input type="checkbox" onClick={() => ArrangeCategory()}/>
              <span class="slider round"></span>
            </label>
            </div>
            <Link to="/cart">
                <div className="BTN">
                    <p className="cart_tag">{cartlength}</p>
                    <GrCart className="btn" onClick={() => fetch_cart()}/>
                </div>
            </Link>
           
        </div>
    )
}
export default Navbar ;