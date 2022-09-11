import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import { addToLocalStorage, getStoredCart } from "../../utilities/fakedb";
import "./_Shop.scss";
import Cart from "../Cart/Cart";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetching Browser Data
  useEffect(() => {
    // Fetching data and set state;
    const fetchedData = async () => {
      const response = await fetch("products.json");
      const data = await response.json();
      setProducts(data);
    };

    fetchedData();
  }, []);

  // some external function / code also used in useEffect. Loading data from other peoples code is side effect
  // only Load ONCE when browser tab is refreshed or revisited
  useEffect(() => {
    const storedProductsIdsWithQuantities = getStoredCart();

    console.log(storedProductsIdsWithQuantities);
    const savedCart = [];
    for (const id in storedProductsIdsWithQuantities) {
      // getting the product. .find will return first element who match the condition

      const addedProduct = products.find((item) => item.id === id);
      console.log(addedProduct);
      // will store all cart product with modified quantity

      if (addedProduct) {
        // modifying addedProduct.quantity
        addedProduct.quantity = storedProductsIdsWithQuantities[id];
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  // processing whole product object so that we have all property for cart calculation
  const handleAddToCart = (selectedProduct) => {
    // if product quantity is greater than 1 then, increase the quantity +1 and do not add the product into the cart again, if the quantity is 1 then add the product into the cart
    if (selectedProduct.quantity > 1) {
      selectedProduct.quantity += 1;
      setCart([...cart]);
    } else {
      setCart([...cart, selectedProduct]);
    }
    addToLocalStorage(selectedProduct.id);
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((item) => (
          <Product
            key={item.id}
            product={item}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <Cart cart={cart} />
    </div>
  );
}
