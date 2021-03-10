Feature: Administrar roles y permisos
    Como usuario super administrador Quiero Administar los roles con sus permisos Para realizar su gestión en


    Scenario: Información que se presenta al ingresar la opción de administrar roles
        Given Que un usuario administrador quiere consultar los roles
        When Ejecuto la consulta
        Then Retorna la informacion de los roles
        

    Scenario Outline: Realizar búsqueda por coincidencia de un rol existente
        Given Que un usuario administrador ingresa minimo tres letras <palabraClave>
        When Ejecuto la busqueda
        Then Retorna la informacion de los roles <roles> que coinciden con la palabra clave
        Examples:
            | palabraClave | roles                   |
            | Admin        | Administrador           |
            | Adm          | Administrador           |
            | Resi         | Residente               |
            | No Existe    | Resultado no encontrado |



    Scenario: Activar o inactivar un rol
        Given Que tengo un rol <rol> con un estado <estado> definido
        When Realizo el cambio de estado al rol
        Then Retorna un mensaje <mensaje>
        Examples:
            | rol | estado    | mensaje                   |
            | 1   | Activar   | El rol ha sido activado   |
            | 2   | Inactivar | El rol ha sido inactivado |

