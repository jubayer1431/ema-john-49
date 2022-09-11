// use local storage to manage cart data
const addToLocalStorage = (id) => {
  let shoppingCart = {};

  //get the shopping cart from local storage
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) shoppingCart = JSON.parse(storedCart);

  // add quantity
  shoppingCart[id] ? (shoppingCart[id] += 1) : (shoppingCart[id] = 1);

  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

const getStoredCart = () => {
  //get the shopping cart from local storage
  const storedCart = localStorage.getItem("shopping-cart");
  return storedCart ? JSON.parse(storedCart) : {};
};

const removeFromDb = (id) => {
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    const shoppingCart = JSON.parse(storedCart);
    if (id in shoppingCart) {
      delete shoppingCart[id];
      localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    }
  }
};

const deleteShoppingCart = () => {
  localStorage.removeItem("shopping-cart");
};

export { addToLocalStorage, getStoredCart, removeFromDb, deleteShoppingCart };
