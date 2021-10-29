import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Homescreen from "./screens/homescreen.js";
import Productscreen from "./screens/productscreen.js";
import Cartscreen from "./screens/cartscreen.js";
import useFetch from "./usefetch.js";
import NotFound from "./screens/NotFound.js";




const App = () =>{
    const {products, cartarr, ispending, cartTotal, cartlength, categoryWise, withoutCategory,
         handledelete, addtocart, deletecart, fetch_cart, SubmitReview, CartInc, CartDec, ArrangeCategory} = useFetch();

    return(
        <BrowserRouter>
            <Navbar fetch_cart={fetch_cart} cartlength={cartlength} ArrangeCategory={ArrangeCategory}/>
        <Switch>
            <Route exact path="/">
            {ispending && <div className="loading_div">Loading.....</div>}
         {categoryWise && <div> { <Homescreen  products={products.filter(p=>p.category == "Shirts")} dlt={handledelete} title={"Shirts"} Addtocart={addtocart} fetch_cart={fetch_cart}/>}
           { <Homescreen  products={products.filter(p=>p.category == "Pants")} dlt={handledelete} title={"Pants"} Addtocart={addtocart} fetch_cart={fetch_cart}/>}
           { <Homescreen  products={products.filter(p=>p.category == "Shoes")} dlt={handledelete} title={"Shoes"} Addtocart={addtocart} fetch_cart={fetch_cart}/>} </div>}
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