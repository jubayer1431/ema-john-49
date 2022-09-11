import React from "react";
import Product from "../Product/Product";
import "./_Cart.scss";

const Cart = ({ cart }) => {
  let itemsSelected = 0;
  let totalPrice = 0;
  let shipping = 0;
  let tax = 0;
  let total = 0;

  for (const item of cart) {
    itemsSelected = itemsSelected + item.quantity;
    totalPrice += item.price * item.quantity;
    shipping += item.shipping * item.quantity;
    tax = (totalPrice * 0.1).toFixed(2) * 1;
    total = totalPrice + shipping + tax;
  }

  return (
    <div className="cart-container">
      <div className="cart-container__body">
        <h4>Order Summery</h4>
        <p>
          {/* Items Selected: {cart.reduce((prev, curr) => curr.quantity + prev, 0)} */}
          Items Selected: {itemsSelected}
        </p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>Shipping: ${shipping.toFixed(2)} </p>
        <p>Tax: ${tax.toFixed(2)} </p>
        <h5>Total: ${total.toFixed(2)}</h5>
      </div>
    </div>
  );
};

export default Cart;
