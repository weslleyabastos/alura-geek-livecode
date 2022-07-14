import { productItemEl } from "../components/product";

class AllProducts {
  #App = document.getElementById("app");
  #products;
  #adminStatus;

  render(data, adminStatus) {
    this.#adminStatus = adminStatus;
    this.#products = data;
    this.#App.innerHTML = this.#generateMarkup();
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) => {
      window.addEventListener(event, () => {
        if (window.location.href.includes("#products")) {
          handler();
        }
      });
    });
  }

  #generateMarkup() {
    return `
    <section class="product-section__all">
          <div class="products-section__main-info--all mg-clear-top container">
            <h2 class="products-section__title">Todos os produtos</h2>
            <a
              href="#addproduct"
              class="products-section__item-link products-section__btn--add btn hidden"
              >Adicionar produto</a
            >
          </div>
        <div class="product-section__all--container container">
          <section class="product-section__all--container mg-clear-bottom">
            ${this.#products
              .map((product) =>
                productItemEl(product, "allProducts", this.#adminStatus)
              )
              .join("")}
          </section>
        </div>
      </section>
    `;
  }
}

export default new AllProducts();
