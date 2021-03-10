import { defineSupportCode, BeforeAll } from 'cucumber';

defineSupportCode(({ When, Then }) => {

  BeforeAll(() => {
  });

  When(/^Ingreso la palabra clave$/, () => {
    return true;
  });

  When(/^Ingreso los datos del usuarios$/, () => {
    return true;
  });

  When(/^Ingreso los caracteres$/, () => {
    return true;
  });

  When(/^Se valida si esta activo o inactivo el usuario$/, () => {
    return true;
  });

  When(/^Se envía el id del usuario$/, () => {
    return true;
  });

  When(/^Se ingresa el numero de la página a navegar$/, () => {
    return true;
  });

  Then(/^el resultado debe ser la palabra clave$/, () => {
    return true;
  });

  Then(/^El sistema retorna los usuarios$/, () => {
    return true;
  });

  Then(/^Se debe retornar la lista del campo asociado al usuario con los valores que contengan los caracteres registrados$/, () => {
    return true;
  });

  Then(/^Se retorna si fue exitoso o no$/, () => {
    return true;
  });

  Then(/^Se retorna si fue eliminado o no$/, () => {
    return true;
  });

  Then(/^Retorna una lista correspondiente a los datos de la pagina$/, () => {
    return true;
  });

  When(/^Ejecuta la busqueda$/, () => {
    return true;
  });

  When(/^Ejecuto la busqueda$/, () => {
    return true;
  });

  When(/^Ejecuto la búsqueda de coincidencias$/, () => {
    return true;
  });

  When(/^Se ejecuta la funcionalidad de activar o inactivar usuario$/, () => {
    return true;
  });

  When(/^Se ejecuta la funcionalidad de eliminar usuario$/, () => {
    return true;
  });

  When(/^Ejecuta la búsqueda de la pagina$/, () => {
    return true;
  });

});
