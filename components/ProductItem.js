import { addToCard } from "../services/Order.js";

export default class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("product-item-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    const product = JSON.parse(this.dataset.product);
    this.querySelector("h4").textContent = product.name;
    this.querySelector("p.price").textContent = `$${product.price.toFixed(2)}`;
    this.querySelector("img").src = new URL(
      `../data/images/${product.image}`,
      import.meta.url,
    ).href;
    const link = this.querySelector("a");
    const button = this.querySelector("button");

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      addToCard(product.id);
    });

    link.addEventListener("click", (event) => {
      event.preventDefault();
      app.router.go(`/product-${product.id}`);
    });
  }
}

customElements.define("product-item", ProductItem);
