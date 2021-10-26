import {Link, useParams} from 'react-router-dom';
import './productscreen.css';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

const Productscreen = ({products, Addtocart, fetch_cart, SubmitReview}) =>{
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const {id} = useParams();
    let today = new Date();
    var weekday = "";
    if(today.getDay() == 1){
        weekday = "Sun";
    }
    else if(today.getDay() == 2){
        weekday = "Mon";
    }
    else if(today.getDay() == 3){
        weekday = "Tue";
    }
    else if(today.getDay() == 4){
        weekday = "Wed";
    }
    else if(today.getDay() == 5){
        weekday = "Thu";
    }
    else if(today.getDay() == 6){
        weekday = "Fri";
    }
    else if(today.getDay() == 7){
        weekday = "Sat";
    }
    var currentDate = weekday + " " + today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes();
///////////////nullifying Review Form
    const NullifyReviewForm = () =>{
        setName(""); 
        setRating(null);
        setComment("");
    }

    return(
        <div className="productscreen_div">
            {(products.filter(f => f.id == id)).map(p =>
                                 <div>
                                        <nav className="pscreen_nav">
                                            <a>Shop / {p.category} / {p.name}</a>
                                        </nav>
                                        <div className="pscreen_mainbox">
                                            <div className="pscreen_box" key={p.id}>
                                                    <img className="pscreen_img" src={p.img}/>
                                                    <p className="product_title">{p.name}</p>
                                                    <div className="mobile_div">
                                                    <img className="pscreen_img_mobile" src={p.img}/>
                                                    <span className="product_price_mobile">${p.price}</span>
                                                    </div>
                                                    <span className="product_price">${p.price}</span>
                                                    <p className="product_des">{p.des}</p>
                                                <Link to="/cart">
                                                    <button className="pscreen_cart_btn" onClick={() => Addtocart(p,p.name)}>Add to Cart</button>
                                                </Link>
                                            </div>
                                        </div>
                                  
                                <h2>Product Reviews({p.review.length})</h2>
                                {p.review.length == 0 && <p className="empty_review">Be the first to add Review!</p>} 
                                {p.review.length !== 0 && <div className="review_map">
                                    {p.review.map(r =>
                                    <div>
                                  <div className="star_div">  {[...Array(5)].map((star, i) =>{
                const ratingValue = i + 1;
                const ratingstar = r.rating;
                return(
                <label>
                    <input type="radio"
                     name="rating" 
                     value={ratingValue}
                     className="star_radio"
                     />
                    <FaStar size={30}
                    color={ratingValue <= ratingstar ? "#ffc107" : "#e4e5e9"}
                    />
                </label>
                )
            })}</div>
            <div className="com_div">
                <p>{r.name}</p>
                <p>"{r.comment}"</p>
                <a className="Date">{r.currentDate}</a>
            </div>
            </div>
            )}
                                </div>}
  </div>
                                )}
    
        <div className="review_div">
            <p className="review_nav">Add Review</p>
            <div className="review_form">
               <div className="inputname_div"><p>Your Name</p>
                <input className="name_input" type="text" value={name}
                 onChange={e => setName(e.target.value)}/></div>
               <div className="rating"><p>Rating</p>
                <div className="star_rating">
            {[...Array(5)].map((star, i) =>{
                const ratingValue = i + 1;
                return(
                <label>
                    <input type="radio"
                     name="rating" 
                     value={ratingValue} 
                     onClick={() => setRating(ratingValue)}
                     className="star_radio"
                     />
                    <FaStar size={30}
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                    />
                </label>
                )
            })}
        </div>
        </div>
        <div className="comment_box">
            <p>Comment</p>
            <textarea value={comment} onChange={e => setComment(e.target.value)}/>
        </div>
                <button className="submit_btn" 
                onClick={() => {SubmitReview(name, rating, comment,currentDate, id) ; NullifyReviewForm()}}>Submit</button>
            </div>

        </div>
        
        </div>
    )
};


export default Productscreen;