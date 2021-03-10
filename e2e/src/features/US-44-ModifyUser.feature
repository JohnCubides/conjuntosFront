Feature: Un usuario ingresa al sistema para Modificar usuario
 
  Scenario:  Actualizacion de datos del usuario
    Given    Que un usuario cuenta con la siguiente informacion
             | TipoIdentificacion   | Cedula    |
             | NumeroIdentificacion | 3248293   |
             | Nombres              | Jose      |
             | Apellidos            | Rodriguez |
             | Telefono             | +53583233 |
    When     Actualizo la informacion del usuario
    Then     Devuelve el mensaje update sucessfull
    
  Scenario Outline:   Subir archivos
    Given  Que un usuario cuenta con un archivo
    When   Sube el archivo al repositorio
    Then   Devuelve la informacion del archivo

    Examples: 
    | identificador | nombre    | ruta                        |
    | 123423412     | photo.jpg | http://localhost/assets/img |