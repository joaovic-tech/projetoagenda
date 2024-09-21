const {
  async
} = require("regenerator-runtime");
const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
  res.render('contato', {
    contato: {}
  });
};

exports.register = async (req, res) => {
  const contato = new Contato(req.body);

  try {
    await contato.register();
  } catch (error) {
    console.log(e);
    return res.render("404");
  }

  if (contato.errors.length > 0) {
    req.flash('errors', contato.errors);
    req.session.save(() => res.location("back"));
    return;
  }

  req.flash('success', "Contato cadastrado com sucesso.");
  req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
  return;
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render('404');

  const contato = await new Contato().buscaPorId(req.params.id);
  if (!contato) return res.render('404');

  res.render('contato', {
    contato
  });
};

exports.edit = async (req, res) => {
  if (!req.params.id) return res.render('404');

  const contato = new Contato(req.body);

  try {
    await contato.edit(req.params.id);
  } catch (error) {
    console.log(e);
    return res.render("404");
  }

  if (contato.errors.length > 0) {
    req.flash('errors', contato.errors);
    req.session.save(() => res.redirect("back"));
    return;
  }

  req.flash('success', "Contato editado com sucesso.");
  req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
  return;
};

exports.delete = async (req, res) => {
  if (!req.params.id) return res.render('404');

  const contato = await new Contato().delete(req.params.id);
  if (!contato) return res.render('404');

  req.flash('success', "Contato excluído com sucesso.");
  req.session.save(() => res.redirect(`back`));
  return;
}