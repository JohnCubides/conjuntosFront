Feature: Crear rol y asignar permisos
  Como usuario super administrador Quiero crear los roles con sus permisos Para que los usuarios tengan los permisos que son en el sistema de inmobiliarias

  Scenario Outline: Realizar la creación de rol sin permisos
    Given que ingreso un nombre de rol <nombre>
    When guardo el rol
    Then se obtiene el mensaje <mensaje>
    Examples:
      | nombre    | mensaje                          |
      | Admin     | El rol ya se encuentra creado    |
      | Admin 28. | Se ha creado el rol exitosamente |

  Scenario Outline: Realizar la creación de rol con asignacion de permisos
    Given que ingreso un nombre de rol <nombre>
    When habilito una opcion de permiso
    And guardo el rol
    Then se obtiene el mensaje <mensaje>
    Examples:
      | nombre    | mensaje                          |
      | Admin     | El rol ya se encuentra creado    |
      | Admin 28. | Se ha creado el rol exitosamente |

  Scenario Outline: Realizar la creación de rol con asignacion de todos los permisos excepto uno
    Given que ingreso un nombre de rol <nombre>
    And habilito todos los permisos de Configuracion
    But no se requiere permiso <permiso> del determinado nivel <nivel>
    When guardo el rol
    Then se obtiene el mensaje <mensaje>
    Examples:
      | nombre    | permiso   | nivel                  | mensaje                          |
      | Admin     | crear     | Unidades Inmobiliarias | Se ha creado el rol exitosamente |
      | Admin 28. | modificar | Unidades Inmobiliarias | Se ha creado el rol exitosamente |
      | Admin 29. | consultar | Unidades Inmobiliarias | Se ha creado el rol exitosamente |

  Scenario Outline: Realizar la creación de rol con asignacion de un permiso
    Given que ingreso un nombre de rol <nombre>
    And habilito un permiso <permiso> en un nivel <nivel> especifico
    When guardo el rol
    Then se obtiene el mensaje <mensaje>
    Examples:
      | nombre    | permiso   | nivel                  | mensaje                          |
      | Admin     | crear     | Unidades Inmobiliarias | Se ha creado el rol exitosamente |
      | Admin 28. | modificar | Unidades Inmobiliarias | Se ha creado el rol exitosamente |
      | Admin 29. | consultar | Unidades Inmobiliarias | Se ha creado el rol exitosamente |























  Scenario Outline: Realizar la creación de rol
    When Ingresa un <nombre> en el campo nombre de rol
    And Da clic en el boton guardar
    Then El sistema presente el mensaje <mensaje>
    Examples:
      | nombre    | mensaje                          |
      | Admin     | El rol ya se encuentra creado    |
      | Admin 28. | Se ha creado el rol exitosamente |
      |           | Campo Obligatorio                |

  Scenario: Seleccionar permisos
    When Se da clic en Configuracion
    And Se da clic en Unidades Inmobiliarias
    And Se da clic en Crear
    Then Se visualizan seleccionados cada check





