import { productItemEl } from "../components/product";
class Consoles {
  #App = document.getElementById("app");
  #data;

  render(data) {
    this.#data = data;
    this.#App.innerHTML = "";
    this.#App.insertAdjacentHTML("afterbegin", this.#generateMarkup());
  }
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, () => {
        if (window.location.hash.includes("#consoles")) handler();
      })
    );
  }
  #generateMarkup() {
    return ` <section class="container">
    <div class="products-section__main-info">
      <h2 class="products-section__title">Consoles</h2>
  </div>
      <section class="products-section__container">
      ${this.#data.map((product) => productItemEl(product)).join("")}
      </section>
    </section>`;
  }
}

export default new Consoles();
