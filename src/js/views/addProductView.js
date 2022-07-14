import drop from "../../img/drop.png";

class AddProduct {
  #App = document.getElementById("app");
  #formData = {
    productImage: "",
    productName: "",
    productPrice: "",
    productDescription: "",
  };

  #formEdit = {
    productImage: "",
    productName: "",
    productPrice: "",
    productDescription: "",
  };

  render() {
    this.#App.innerHTML = "";
    this.#App.insertAdjacentHTML("afterbegin", this.#generateMarkup());
  }

  getImage() {
    const dragForm = document.querySelector(".form-drag");
    const dragStatus = document.getElementById("form-drag--status");
    const imageInput = document.getElementById("imagem");
    const uploadLabelEl = document.querySelector(".upload-label");

    imageInput.addEventListener("change", (event) => {
      const validExtensions = ["image/jpeg", "image/png", "image/jpg"];
      if (validExtensions.includes(event.target.files[0].type)) {
        let fileRender = new FileReader();
        fileRender.onload = () => {
          let fileURL = fileRender.result;
          this.#formData.productImage = fileURL;
        };

        fileRender.readAsDataURL(event.target.files[0]);

        if (event.target.files[0].name.length >= 25) {
          uploadLabelEl.innerText =
            event.target.files[0].name.slice(0, -15) + "...";
        } else {
          uploadLabelEl.innerText = event.target.files[0].name;
          dragStatus.innerText =
            "Arraste para adicionar uma imagem para o produto";
          dragForm.classList.remove("form-drag--active");
        }
      } else {
        alert(
          "Não é um arquivo de imagem válido. Insira um arquivo JPEG, PNG ou JPG."
        );
      }
    });

    dragForm.addEventListener("dragover", (event) => {
      event.preventDefault();
      dragForm.classList.add("form-drag--active");
      dragForm.classList.remove("form-drag--invalid");
      dragStatus.innerText = "Arraste para adicionar uma imagem para o produto";
    });

    dragForm.addEventListener("dragleave", () => {
      dragForm.classList.remove("form-drag--active");
    });

    dragForm.addEventListener("drop", (event) => {
      event.preventDefault();
      const validExtensions = ["image/jpeg", "image/png", "image/jpg"];
      if (validExtensions.includes(event.dataTransfer.files[0].type)) {
        dragStatus.innerText = event.dataTransfer.files[0].name;

        let fileRender = new FileReader();
        fileRender.onload = () => {
          let fileURL = fileRender.result;
          this.#formData.productImage = fileURL;
        };

        fileRender.readAsDataURL(event.dataTransfer.files[0]);

        dragForm.classList.remove("form-drag--invalid");
        uploadLabelEl.innerText = "Procure no seu computador";
      } else {
        dragStatus.innerText =
          "Não é um arquivo de imagem válido. Insira um arquivo JPEG, PNG ou JPG.";
        dragForm.classList.remove("form-drag--active");
        dragForm.classList.add("form-drag--invalid");
      }
    });
  }

  sendFormData(create, update) {
    const formAddProduct = document.querySelector(".form-add-product");
    const dragStatus = document.getElementById("form-drag--status");
    const dragForm = document.querySelector(".form-drag");
    const uploadLabelEl = document.querySelector(".upload-label");
    let name = document.querySelector(".name");
    let price = document.querySelector(".price");
    let description = document.querySelector(".description");

    formAddProduct.addEventListener("submit", (event) => {
      event.preventDefault();
      if (Object.values(this.#formEdit).every((property) => property === "")) {
        if (this.#formData.productImage === "") {
          alert("Insira uma imagem ao produto.");
        } else {
          this.#formData.productName = name.value;
          this.#formData.productPrice = price.value;
          this.#formData.productDescription = description.value;
          create(this.#formData);
          alert("Produto adicionado.");
          window.location.href = "#products";
        }
      } else {
        this.#formEdit.productName = name.value;
        this.#formEdit.productPrice = price.value;
        this.#formEdit.productDescription = description.value;
        if (this.#formData.productImage != "") {
          this.#formEdit.productImage = this.#formData.productImage;
        }
        update(this.#formEdit);
        alert("Produto atualizado.");
        window.location.href = "#products";
      }

      dragStatus.innerText = "Arraste para adicionar uma imagem para o produto";
      dragForm.classList.remove("form-drag--active");
      uploadLabelEl.innerText = "Procure no seu computador";
    });
  }

  editProduct(data) {
    let name = document.querySelector(".name");
    let price = document.querySelector(".price");
    let description = document.querySelector(".description");
    let dragForm = document.querySelector(".form-drag");

    if (!data.name && !data.price && !data.description) return;

    name.value = data.name;
    price.value = data.price;
    description.value = data.description;
    dragForm.insertAdjacentHTML(
      "afterbegin",
      `<img class="imageUrl" src=${data.imageUrl} alt="Product">`
    );

    this.#formEdit.productName = name.value;
    this.#formEdit.productPrice = price.value;
    this.#formEdit.productDescription = description.value;
    this.#formEdit.productImage = data.imageUrl;
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, () => {
        if (
          window.location.hash.includes("#addproduct") &&
          window.localStorage.getItem("admin")
        ) {
          handler();
        }
      })
    );
  }

  #generateMarkup() {
    return `<form action="#" class="form-add-product">
      <div class="form-add-product__container container">
        <h2 class="form-add-product__title">Adicionar novo produto</h2>
        <ul class="form__inputs">
          <li class="form-drag">
            <img src=${drop} alt="Drop" class="drop" />
            <p id="form-drag--status">Arraste para adicionar uma imagem para o produto</p>
          </li>
          <li class="form__local-upload">
            <label
              for="imagem"
              class="upload-label"
              title="Clique para selecionar imagem..."
              >Procure no seu computador</label
            >
            <input type="file" name="imagem" id="imagem" accept="image/*" />
          </li>
          <li class="form-name">
            <input type="text" placeholder="Nome do produto" class="name" maxlength="20" min="1" required />
          </li>
          <li class="form-price">
            <input placeholder="Preço do produto" class="price" type="number" min="1" required />
          </li>
          <li class="form-description">
            <textarea
              placeholder="Descrição do produto"
              class="description input-item"
              maxlength="150"
              min="1"
              required
            ></textarea>
          </li>
        </ul>
        <button class="form__add--btn btn">Adicionar produto</button>
      </div>
    </form>`;
  }
}

export default new AddProduct();
