import { productItemEl } from "../components/product";

class ProductView {
  #App = document.getElementById("app");
  #sections;

  render(data) {
    this.#sections = data;
    this.#App.innerHTML = "";
    this.#App.insertAdjacentHTML("afterbegin", this.#generateMarkup());
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, () => {
        if (
          window.location.href.includes("#home") ||
          window.location.href === "http://localhost:1234/"
        ) {
          document.location.hash = "#home";
          handler.controlProducts();
        } else if (
          !window.location.href.includes("#products") &&
          !window.location.href.includes("#login") &&
          !window.location.href.includes("#addproduct") &&
          !window.location.href.includes("#consoles")
        ) {
          handler.controlProductDescription();
        }
      })
    );
  }

  #generateMarkup() {
    return `
    <header class="hero">
    <div class="hero__content container">
        <h1 class="hero__content-title">Dezembro Promocional</h1>
        <p class="hero__content-paragraph">
          Produtos selecionados com 33% de desconto
        </p>
        <a class="hero__content-btn btn" href="#consoles">Ver Consoles</a>
      </div>
    </header>
      <div class="all-products__container container">
        <section>
          <div class="products-section__main-info">
            <h2 class="products-section__title">Star Wars</h2>
            <a href="#products" class="products-section__item-link">Ver tudo &xrarr;</a>
        </div>
            <section class="products-section__container">
              ${this.#sections[0]
                .map((product) => productItemEl(product))
                .join("")}
            </section>
          </section>
          <section>
          <div class="products-section__main-info">
            <h2 class="products-section__title">Consoles</h2>
            <a href="#products" class="products-section__item-link">Ver tudo &xrarr;</a>
        </div>
            <section class="products-section__container">
            ${this.#sections[1]
              .map((product) => productItemEl(product))
              .join("")}
            </section>
          </section>
          <section>
          <div class="products-section__main-info">
            <h2 class="products-section__title">Diversos</h2>
            <a href="#products" class="products-section__item-link">Ver tudo &xrarr;</a>
        </div>
            <section class="products-section__container">
            ${this.#sections[2]
              .map((product) => productItemEl(product))
              .join("")}
            </section>
          </section>
        </div>
        `;
  }
}

export default new ProductView();
