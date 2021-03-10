import { Given, When, Then } from 'cucumber';

Given(/^Que un usuario administrador quiere consultar los roles$/, () => {
});

Given(/^Que un usuario administrador ingresa minimo tres letras (.+)$/, (palabraclave, callback) => {
  return true;
});

Given(/^Que tengo un rol (.+) con un estado (.+) definido$/, (rol, estado, callback) => {
  callback.pending();
});

When(/^Ejecuto la consulta$/, () => {
  return true;
});

When(/^Ejecuto la busqueda$/, (callback) => {
  return true;
});

When(/^Realizo el cambio de estado al rol$/, (callback) => {
  return true;
});

Then(/^Retorna la informacion de los roles$/, () => {
  return true;
});

Then(/^Retorna la informacion de los roles (.+) que coinciden con la palabra clave$/, (roles, callback) => {
  return true;
});

Then(/^Retorna un mensaje (.+)$/, (mensaje, callback) => {
  return true;
});

