import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
import Contato from './modules/Contato';

const login = new Login("form-login");
const cadastro = new Login("form-cadastro-contato");
const contato = new Contato("form-cadastro-contato");

login.init();
cadastro.init();
contato.init();

function formatarTelefone(telefone) {
  const numero = telefone.replace(/\D/g, '');

  console.log(numero.length === 11);

  return numero.length === 11 ?
    `(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7)}` :
    telefone; // Retorna o original se não tiver 11 dígitos
}

document.querySelectorAll('.telefone').forEach(element => {
  element.textContent = formatarTelefone(element.textContent);
});