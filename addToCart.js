import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getCartProductFromLS();

export const addToCart = (event, id, stock) => {
    let arrLocalStorageProduct = getCartProductFromLS();

    const currentProdElem = document.querySelector(`#card${id}`);
    console.log(currentProdElem);
    
    let quantity = currentProdElem.querySelector(".productQuantity").innerHTML;
    let price = currentProdElem.querySelector(".productPrice").innerHTML; 

    console.log(quantity, price);
    price = price.replace("₹", "");

    let existingProd = arrLocalStorageProduct.find(
        (curProd) => curProd.id === id
    );

    if(existingProd && quantity > 1){
        quantity  = Number(existingProd.quantity) + Number(quantity);
        price = Number(price * quantity);
        
        let updatedCart = { id, quantity, price };

        updatedCart = arrLocalStorageProduct.map((curProd) => {
            return curProd.id === id ? updatedCart : curProd;
        });
        console.log(updatedCart);
        

        localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));

        //show toast when product added to the crt
        showToast("add", id);
    }

    if(existingProd){
        //alert("Bhai Bhai");
        return false;
    }

    price = Number(price * quantity);
    quantity = Number(quantity);

    arrLocalStorageProduct.push({id, quantity, price});
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

    //update the cart button value
    updateCartValue(arrLocalStorageProduct);

    //show toast when product added to the crt
    showToast("add", id);
} 

