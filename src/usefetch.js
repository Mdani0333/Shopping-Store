import {useState} from 'react';
import { useEffect } from "react";

//////////CUSTOM HOOK//////////////////////
const useFetch = () =>{
    const [products, setProducts] = useState([]);
    const [cartarr, setCartarr] = useState([]);
    var [ispending, setIspending] = useState(true);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartlength, setCartlength] = useState(0);
    const [categoryWise, setCategoryWise] = useState(false);
    const [withoutCategory, setWithoutCategory] = useState(true);

    const [apiTest, setApiTest] = useState([]);
    const CART_URL = 'https://my-json-server.typicode.com/Mdani0333/Fake-Rest-API/cart';
    const PRODUCTS_URL = 'https://my-json-server.typicode.com/Mdani0333/Fake-Rest-API/products';


    useEffect(() => {
        cartTag();
      }, [cartarr]);

    const cartTag = () =>{
    setCartlength(cartarr.length);
    }

///////////////////cartTotal function
    useEffect(() => {
        total();
      }, [cartarr]);
    
      const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cartarr.length; i++) {
          totalVal += cartarr[i].price*cartarr[i].quantity;
        }
        setCartTotal(totalVal);
      };
    ////////////FETCHING PRODUCTS
    const FetchProducts = () =>{
            fetch(`${PRODUCTS_URL}`)
            .then(res => {
                return res.json();
            })
            .then(data =>{
                setProducts(data);
                setIspending(false);
            });
    }

//////// fetching products only on refresh
    useEffect(() => {
        FetchProducts();
    }, []);

    //////////fetching cart
   const fetch_cart = () =>{
    fetch(`${CART_URL}`)
    .then(res => {
        return res.json();
    })
    .then(data =>{
        setCartarr(data);
    });
}
//////////fetch cart on refresh only
    useEffect(()=>{
        fetch_cart();
    },[]);

    ///////////products delete function
    const handledelete = (id) =>{
        let newarray = products.filter(f=> f.id !== id);
        setProducts(newarray);
    }

    //////////////////CART Quantuty Update FUNC
    const UpdateCartQty = (id, quantity_increment) =>{
        fetch(`${CART_URL}/${id}` ,{
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({quantity: `${quantity_increment}`})
        })
        .then(()=>{
            console.log('UPDATED');
            fetch_cart();
        });
    }

    //////////////ADDTOCART FUNCTION
    const addtocart = (p, name) =>{
        if(cartarr.find(f => f.name == name)){
          let obj = cartarr.find(f => f.name == name);
          let id = obj.id;
          let index = cartarr.findIndex(f => f.name == name);
          let quantity_increment = parseInt(cartarr[index].quantity);
          quantity_increment = quantity_increment + 1;
          UpdateCartQty(id, quantity_increment);
        }
        else{
            const addcart = p;
            delete addcart.id;
            delete addcart.review;
            addcart.quantity = 1;
            fetch(`${CART_URL}`,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(addcart)
            })
            .then(() =>{
                console.log('ADDED');
                fetch_cart();
            });
        }
    }

    //////////////delete from cart func
    const deletecart = (id) =>{
        fetch(`${CART_URL}/${id}`,{
            method: "DELETE"
        })
        .then(() =>{
            console.log("DELETED");
            fetch_cart();
        });
    }
    ///////////// Cart Increment button func
    const CartInc = (id, name) =>{
        let index = cartarr.findIndex(f => f.name == name);
        let quantity_increment = parseInt(cartarr[index].quantity);
        quantity_increment = quantity_increment + 1;
        UpdateCartQty(id, quantity_increment);
    }

    ///////////// Cart Decrement button func
     const CartDec = (id, name) =>{
        let index = cartarr.findIndex(f => f.name == name);
        let quantity_increment = parseInt(cartarr[index].quantity);
        quantity_increment = quantity_increment - 1;
        UpdateCartQty(id, quantity_increment);
    }

    /////////////////// Products Review
    const SubmitReview = (name, rating, comment, currentDate, id, Review) =>{
        var review_object = {name, rating, comment, currentDate};
        var index = products.findIndex(f => f.id == id);
        const ReviewArray = products[index].review;
        
        fetch(`${PRODUCTS_URL}/${id}`,{
            method: "PATCH",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify({review: [...ReviewArray, review_object]})
          })
          .then(()=>{
              console.log('REVIEW ADDED');
              FetchProducts();
          }
        );
    }

    //////////////////Arranging by category wise/////////////////////////

    const ArrangeCategory = () =>{
        if(categoryWise != false){
            setCategoryWise(false);
            setWithoutCategory(true);
        }
        else{
            setCategoryWise(true);
            setWithoutCategory(false);
        }
    }
    
    //////////////////API Check
    const apicheck = () =>{
        fetch("https://iterar-mapi-us.p.rapidapi.com/api/reserpine/substances.json", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "iterar-mapi-us.p.rapidapi.com",
                "x-rapidapi-key": "a1d1237975msh624576b4f4886c9p18920djsna65fc907d1c8"
            }
        })
        .then(res => {
            return res.json();
        })
        .then(data =>{
            setApiTest(data);
            console.log(apiTest);
        });
    }


    return {
        products,
        cartarr,
        ispending,
        handledelete,
        addtocart, 
        deletecart,
        fetch_cart,
        SubmitReview,
        CartInc,
        CartDec,
        ArrangeCategory,
        cartTotal,
        cartlength,
        categoryWise, 
        withoutCategory, 
        apicheck
    }
}
export default useFetch;