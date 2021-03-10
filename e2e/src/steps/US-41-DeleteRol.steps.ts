import { Given, When, Then } from 'cucumber';

Given(/^Que cuento con el rol 1$/, () => {
    return true;
  });

Given(/^Que cuento con el rol 3$/, () => {
     return true;
  });

When(/^Ejecuto una eliminacion$/, () => {
     return true;
  });

Then(/^Devuelve un mensaje Delete succesful$/, () => {
     return true;
  });

Then(/^Devuelve un mensaje ROL_NOT_DELETED_ASSIGNED_USER$/, () => {
     return true;
  });
