export default class OrderPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    const section = document.createElement("section");
    this.root.appendChild(section);

    async function loadCSS() {
      const request = await fetch(new URL("./OrderPage.css", import.meta.url));
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  connectedCallback() {
    window.addEventListener("appcartchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    let section = this.root.querySelector("section");
    if (app.store.cart.length == 0) {
      section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `;
    } else {
      let total = 0;
      section.innerHTML = `
          <h2>Your Order</h2>
          <ul></ul>
      `;
      const ul = section.querySelector("ul");

      for (let prodInCart of app.store.cart) {
        const item = document.createElement("cart-item");
        item.dataset.item = JSON.stringify(prodInCart);
        ul.appendChild(item);
        total += prodInCart.quantity * prodInCart.product.price;
      }

      const totalLi = document.createElement("li");
      totalLi.innerHTML = `
            <p class='total'>Total</p>
            <p class='price-total'>$${total.toFixed(2)}</p>
      `;
      ul.appendChild(totalLi);

      const template = document.getElementById("order-form-template");
      const content = template.content.cloneNode(true);
      section.appendChild(content);
    }
  }
}
customElements.define("order-page", OrderPage);
