Feature: Administrar usuarios

  Scenario: Realizar una búsqueda de Tarjeta de Ingreso
    When Ingreso la palabra clave
    And Ejecuta la busqueda
    Then el resultado debe ser la palabra clave

  Scenario: Buscar usuario
    When Ingreso los datos del usuarios
    And Ejecuto la busqueda
    Then El sistema retorna los usuarios

  Scenario: Se comprueba la funcionalidad de autocompletado
    When Ingreso los caracteres
    And Ejecuto la búsqueda de coincidencias
    Then Se debe retornar la lista del campo asociado al usuario con los valores que contengan los caracteres registrados

  Scenario: Validación de la funcionalidad de activar o inactivar usuario
    When Se valida si esta activo o inactivo el usuario
    And Se ejecuta la funcionalidad de activar o inactivar usuario
    Then Se retorna si fue exitoso o no

  Scenario: Eliminar usuario
    When Se envía el id del usuario
    And Se ejecuta la funcionalidad de eliminar usuario
    Then Se retorna si fue eliminado o no

  Scenario: Paginador
    When Se ingresa el numero de la página a navegar
    And Ejecuta la búsqueda de la pagina
    Then Retorna una lista correspondiente a los datos de la pagina
