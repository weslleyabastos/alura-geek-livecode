import { productDescription, productItemEl } from "../components/product";

class ProductDescription {
  #App = document.getElementById("app");
  #section;
  #productItem;

  render(data, product) {
    this.#section = data;
    this.#productItem = product;
    this.#App.innerHTML = "";
    this.#App.insertAdjacentHTML("afterbegin", this.#generateMarkup());
  }
  #generateMarkup() {
    return ` <section class="product">
    <div class="product__container container">
        ${productDescription(this.#productItem)}
      </div>
    </div>
    <div class="container">
      <section>
        <div class="products-section__main-info">
          <h2 class="products-section__title">Produtos similares</h2>
          <a href="#" class="products-section__item-link">Ver tudo &xrarr;</a>
        </div>
        <section class="products-section__container">
        ${this.#section.map((product) => productItemEl(product)).join("")}
        </section>
      </section>
  </section> `;
  }
}

export default new ProductDescription();
