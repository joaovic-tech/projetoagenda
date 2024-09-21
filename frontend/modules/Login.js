import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(`.${formClass}`);
  }

  clearErrors() {
    const errorMessages = this.form.querySelectorAll(".error-message");
    errorMessages.forEach((errorMessage) => {
      errorMessage.textContent = "";
    });
  }

  showError(inputElement, message) {
    const errorSpan = inputElement.parentElement.querySelector(".error-message");
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  }

  validade(e) {
    const el = e.target;
    const emailInput = el.querySelector("input[name='email']");
    const passwordInput = el.querySelector("input[name='password']");
    let error = false;

    // Limpa mensagens de erro anteriores
    this.clearErrors();

    // Verifica se o campo email existe antes de validar
    if (emailInput) {
      if (!validator.isEmail(emailInput.value)) {
        this.showError(emailInput, "E-mail inválido");
        error = true;
      }
    }

    // Verifica se o campo password existe antes de validar
    if (passwordInput) {
      if (passwordInput.value.length < 3 || passwordInput.value.length >= 50) {
        this.showError(passwordInput, "A senha precisa ter entre 3 e 50 caracteres");
        error = true;
      }
    }

    // Se não houver erros, submete o formulário
    if (!error) el.submit();
  }


  init() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validade(e);
    });
  }
}