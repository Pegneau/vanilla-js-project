import { getProductById } from "./Menu.js";

export async function addToCard(id) {
  const product = await getProductById(id);
  const result = app.store.cart.filter(
    (prodInCart) => prodInCart.product.id == id,
  );
  if (result.length == 1) {
    //the product is already in the cart
    //update the current item
    app.store.cart = app.store.cart.map((p) =>
      p.product.id == id ? { ...p, quantity: p.quantity + 1 } : p,
    );
  } else {
    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter((p) => p.product.id != id);
}
