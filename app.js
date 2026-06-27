import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";

window.addEventListener("DOMContentLoaded", async () => {
  loadData();
});
