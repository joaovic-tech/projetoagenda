import validator from "validator";

export default class Contato {
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
    const nomeInput = el.querySelector("input[name='nome']");
    const sobrenomeInput = el.querySelector("input[name='sobrenome']"); // Adicionei essa linha
    const emailInput = el.querySelector("input[name='email']");
    const telefoneInput = el.querySelector("input[name='telefone']");
    let existError = false;

    // Limpa mensagens de erro anteriores
    this.clearErrors();

    if (nomeInput.value.length < 3 || nomeInput.value.length >= 50) {
      this.showError(nomeInput, "Nome precisa ter entre 3 e 50 caracteres");
      existError = true;
    }

    // E-mail deve ser válido se for preenchido
    if (emailInput.value && !validator.isEmail(emailInput.value)) {
      this.showError(emailInput, "E-mail inválido");
      existError = true;
    }

    // Pelo menos um dos contatos (email ou telefone) deve ser preenchido
    if (!emailInput.value && !telefoneInput.value.trim()) {
      this.showError(telefoneInput, "Pelo menos um contato precisa ser enviado: E-mail ou telefone.");
      this.showError(emailInput, "Pelo menos um contato precisa ser enviado: E-mail ou telefone.");
      existError = true;
    }

    // Se não houver erros, submete o formulário
    if (existError) return;
    el.submit();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validade(e);
    });
  }
}