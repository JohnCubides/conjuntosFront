Feature: Eliminar rol
Yo como usuario super-administrador quiero Eliminar los roles para que ya no exista el rol en la aplicacion

Scenario Outline: Eliminar rol sin asignacion
  Given Que cuento con el rol 1
  When Ejecuto una eliminacion
  Then Devuelve un mensaje Delete succesful

 
Scenario Outline: Eliminar rol con asignacion
  Given Que cuento con el rol 3
  When Ejecuto una eliminacion
  Then Devuelve un mensaje ROL_NOT_DELETED_ASSIGNED_USER
