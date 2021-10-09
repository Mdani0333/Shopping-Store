import './homescreen.css';
import { Link } from 'react-router-dom';

const Homescreen = ({Addtocart,products, dlt, title}) =>{
    return(
        <div className="homescreen__maindiv">
            <h2>{title}</h2>
            <div className="products">
            {products.map(p =>
                <div className="product" key={p.id}>
                    <div className="img_div">
                        <img src={p.img} alt=""/>
                        <p>${p.price}</p>
                    </div>
                    <h3>{p.name}</h3>
                    <div className="btn_div">
                        <Link to={`/product/${p.id}`}><button className="product_btn">Product Details</button></Link>
                        <Link to="/cart"><button className="cart_btn" onClick={()=> Addtocart(p,p.name)}>Add to Cart</button></Link>
                        {/* <button className="delete_btn" onClick={() => dlt(p.id)}>Delete</button> */}
                    </div>
                </div>
                )}
        </div>
        </div>
    )
};
export default Homescreen;