import deleteButtom from "../../img/delete-buttom.png";
import editButtom from "../../img/edit-buttom.png";

export const productItemEl = (products, section, adminStatus) => {
  const adminMenu = (id) => {
    return `
    <div class="admin-menu">
        <img src=${deleteButtom} class="admin-menu__delete admin-btn" alt="" title="Deletar" data-id=${id}></img>
        <img src=${editButtom} class="admin-menu__edit admin-btn" alt="" title="Editar" data-id=${id}></img>
        </div>
    `;
  };
  return `<div class="products-section__item item--${products.id}">
        <img
          src=${products.imageUrl}
          alt=${products.alt}
          class=${
            section === "allProducts"
              ? "all-products--img"
              : "products-section__item-img"
          }
        />
        ${adminStatus ? adminMenu(products.id) : ""}
        <h3 class="products-section__item-title">${products.name}</h3>
        <p class="products-section__item-price">R$ ${Number(products.price)
          .toFixed(2)
          .replace(".", ",")}</p>
        <a href="#${
          products.id
        }" class="products-section__item-link">Ver produto</a>
      </div>`;
};

export const productDescription = (product) => {
  if (!product) return;
  return `<div class="product__img full-width">
  <img src=${product.imageUrl} alt=${product.alt} />
</div>
<div class="product__content">
  <h2 class="product__title">${product.name}</h2>
  <h3 class="product__price">R$ ${Number(product.price)
    .toFixed(2)
    .replace(".", ",")}</h3>
  <p class="product__description">
    ${product.description}
  </p>
</div>`;
};
