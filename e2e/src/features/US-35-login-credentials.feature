Feature: Como usuario de la aplicación de conjuntos deseo iniciar sesión para gestionar unidades inmobiliarias.

    Scenario Outline: : Inicio de sesión
        Given que el usuario esta en el formulario
        When el usuario ingresa su <usuario>
        And y su <contrasena>
        And se envia el inicio de session
        Then obtiene el mesaje <mensaje>

            | usuario   | contraseña | mensaje           |
            | jabarbosa | 234324     | bienvenido        |
            | richard   | 123456     | error al ingresar |
