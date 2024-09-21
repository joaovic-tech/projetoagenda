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