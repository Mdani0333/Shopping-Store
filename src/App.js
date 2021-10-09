import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Homescreen from "./screens/homescreen.js";
import Productscreen from "./screens/productscreen.js";
import Cartscreen from "./screens/cartscreen.js";
import useFetch from "./usefetch.js";
import NotFound from "./screens/NotFound.js";
// import {categoryWise} from "./components/Navbar";




const App = () =>{
    const {products, cartarr, ispending, cartTotal, cartlength, categoryWise, withoutCategory,
         handledelete, addtocart, deletecart, fetch_cart, SubmitReview, CartInc, CartDec, ArrangeCategory} = useFetch();

    return(
        <BrowserRouter>
            <Navbar fetch_cart={fetch_cart} cartlength={cartlength} ArrangeCategory={ArrangeCategory}/>
        <Switch>
            <Route exact path="/">
            {ispending && <div className="loading_div">Loading.....</div>}
         {categoryWise && <div> { <Homescreen  products={products.filter(p=>p.category == "tasty snacks")} dlt={handledelete} title={"Tasty Snacks"} Addtocart={addtocart} fetch_cart={fetch_cart}/>}
           { <Homescreen  products={products.filter(p=>p.category == "pastaries")} dlt={handledelete} title={"Pastaries"} Addtocart={addtocart} fetch_cart={fetch_cart}/>}
           { <Homescreen  products={products.filter(p=>p.category == "twinkies")} dlt={handledelete} title={"Twinkies"} Addtocart={addtocart} fetch_cart={fetch_cart}/>} </div>}
           { withoutCategory && <Homescreen  products={products} dlt={handledelete} Addtocart={addtocart}/>}
            </Route>
            <Route exact path="/product/:id">
                <Productscreen products={products}
                 Addtocart={addtocart} 
                 fetch_cart={fetch_cart}
                 SubmitReview={SubmitReview}
                 />
            </Route>
            <Route exact path="/cart">
                <Cartscreen cartarr={cartarr} deletecart={deletecart} cartTotal={cartTotal}
                CartInc={CartInc} CartDec={CartDec}
                />
            </Route>
            <Route path="*">
                <NotFound/>
            </Route>
        </Switch>
        </BrowserRouter>
    )
}
export default App;