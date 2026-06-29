import { getProductById } from "../services/Menu.js";
import { addToCard } from "../services/Order.js";
export class DetailsPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("details-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch(new URL("./DetailsPage.css", import.meta.url));
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  async renderData() {
    if (this.dataset.productId) {
      this.product = await getProductById(this.dataset.productId);
      if (!this.product) {
        alert("Product not found");
        return;
      }
      this.root.querySelector("h2").textContent = this.product.name;
      this.root.querySelector("img").src = new URL(
        `../data/images/${this.product.image}`,
        import.meta.url,
      ).href;
      this.root.querySelector(".description").textContent =
        this.product.description;
      this.root.querySelector(".price").textContent =
        `$ ${this.product.price.toFixed(2)} ea`;
      this.root.querySelector("button").addEventListener("click", () => {
        addToCard(this.product.id);
        app.router.go("/order");
      });
    } else {
      alert("Invalid Product ID");
    }
  }

  connectedCallback() {
    this.renderData();
  }
}

customElements.define("details-page", DetailsPage);
