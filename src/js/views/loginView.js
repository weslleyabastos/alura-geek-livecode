class Login {
  #App = document.getElementById("app");

  render() {
    this.#App.innerHTML = "";
    this.#App.insertAdjacentHTML("afterbegin", this.#generateMarkup());
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, () => {
        if (window.location.hash.includes("#login")) handler();
      })
    );
  }

  #generateMarkup() {
    return `
    <form action="#" class="form__login">
      <div class="container">
        <h3 class="form__title">Iniciar Sessão</h3>
        <input
          type="email"
          name="e-mail"
          id="mail"
          placeholder="Escreva seu email"
          class="form__email"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Escreva sua senha"
          class="form__password"
        />
        <button class="form__btn btn">Entrar</button>
      </div>
    </form>`;
  }
}

export default new Login();
