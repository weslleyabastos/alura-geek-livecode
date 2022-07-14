export const state = {
  products: {},
  productItem: {},
  productSection: {},
  userData: {},
  userAdminStatus: false,
  currentProduct: {},
};

export const loadProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    state.products = data;
  } catch (error) {
    console.log(error);
  }
};

export const filteredSections = async (section) => {
  const response = await fetch("http://localhost:3000/products/");
  const data = await response.json();
  const filter = data.filter((product) =>
    product.section === `${section}` ? product.section : undefined
  );
  return filter;
};

export const productDescription = async (id) => {
  if (!id) return;
  let productId = Number(id);
  const response = await fetch(`http://localhost:3000/products/${productId}`);
  const data = await response.json();
  state.productItem = data;
};

export const loadLoginData = async () => {
  const response = await fetch(`http://localhost:3000/users/`);
  const data = await response.json();
  state.userData = data;
};

export const deleteProduct = async (id) => {
  if (!id) return;
  try {
    const response = await fetch(`http://localhost:3000/products/${+id}`, {
      method: "DELETE",
    });

    if (response.status === 200) window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (id) => {
  if (!id) return;
  let productId = Number(id);
  const response = await fetch(`http://localhost:3000/products/${productId}`);
  const data = await response.json();
  state.currentProduct = data;
  console.log(state.currentProduct);
};

export const updateProduct = async (productInfo) => {
  console.log(productInfo);
  return await fetch(
    `http://localhost:3000/products/${state.currentProduct.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productInfo.productName,
        imageUrl: productInfo.productImage,
        price: productInfo.productPrice,
        alt: "Product",
        description: productInfo.productDescription,
      }),
    }
  );
};

export const createNewProduct = async (productInfo) => {
  return await fetch(`http://localhost:3000/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: productInfo.productName,
      imageUrl: productInfo.productImage,
      price: productInfo.productPrice,
      alt: "Product",
      description: productInfo.productDescription,
    }),
  });
};
