import './cartscreen.css';
import {FiPlus} from 'react-icons/fi';
import {FiMinus} from 'react-icons/fi';



const Cartscreen = ({products, cartarr, deletecart, cartTotal, CartInc, CartDec}) =>{

    
    return(
        <div className="main_cart">
            <div className="cart_div_header">
                <p>Qty</p>
                <p>Product</p>
                <p className="cart_total_header">SubTotal</p>
            </div>
            <div className="cart_parent_div">
                {cartarr.map(p =>
                <div className="cart_div" key={p.id}>
                    <p className="cart_qty">{p.quantity}</p>
                    <img className="cart_img" src={p.img}/>
                    <p className="cart_des">{p.name} -<span className="BOLD">${p.price}/Each</span></p>
                    <div className="cart_buttons">
                        <button className="cart_delete_btn" onClick={()=>deletecart(p.id)}>DLT</button>
                        <button className="cart_inc_btn" onClick={()=>CartInc(p.id, p.name)}><FiPlus/></button>
                        <button className="cart_dec_btn" onClick={()=>CartDec(p.id, p.name)}><FiMinus/></button>
                    </div>
                    <p className="cart_subtotal">${parseFloat(p.quantity*p.price).toFixed(2)}</p>
                </div>  
                )}
            </div>
            <div className="carttotal">Total: ${parseFloat(cartTotal).toFixed(2)}</div>
        </div>
    )
}
export default Cartscreen;