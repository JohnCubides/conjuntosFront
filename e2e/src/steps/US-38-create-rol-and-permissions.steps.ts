import { Given, When, Then, Before } from 'cucumber';

module.exports = () => {

  Given(/^que ingreso un nombre de rol (.+)$/,  (nombre, callback) => {
    callback.pending();
  });

  When(/^guardo el rol$/,  (callback) => {
    callback.pending();
  });

  When(/^habilito una opcion de permiso$/,  (callback) => {
    callback.pending();
  });

  Then(/^se obtiene el mensaje (.+)$/, (mensaje, callback) => {
    callback.pending();
  });

  Then(/^guardo el rol$/,  (callback) => {
    callback.pending();
  });

  Then(/^habilito todos los permisos de Configuracion$/,  (callback) => {
    callback.pending();
  });

  Then(/^habilito un permiso (.+) en un nivel (.+) especifico$/,  (permiso, nivel, callback) => {
    callback.pending();
  });

  Then(/^no se requiere permiso (.+) del determinado nivel (.+)$/,  (permiso, nivel, callback) => {
    callback.pending();
  });

};
