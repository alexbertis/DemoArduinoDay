# Subiendo los archivos de functions 

Antes de nada, dejar claro que estos archivos no deben ser movidos hasta que se indique.
## Inicializando el entorno Node.JS
1. Para reproducir las condiciones exactas y no dar pie a posibles errores, descarga la versión 7.8.0 de Node.JS (con NPM 4.2.0) aquí:
https://nodejs.org/dist/v7.8.0/

1. Crea una carpeta vacía en cualquier ruta. Accede a la carpeta y abre la consola en ella (símbolo del sistema, Powershell, etc.)

1. Sigue los pasos de la documentación que aporta Firebase sobre cómo inicializar el entorno aquí: 
https://firebase.google.com/docs/functions/get-started?hl=es-419#set_up_and_initialize

1. Selecciona, cuando se muestre la opción, JavaScript (y no TypeScript) para inicializar las funciones.
Se creará un directorio con el nombre _'functions'_. 

1. ¡Ya has inicializado la carpeta para las funciones de Firebase en la nube!

## Sustituyendo los archivos y subiendo las funciones
En esa carpeta aparecerán dos archivos (además de otra carpeta que debemos dejar intacta) llamados _'index.js'_ y _'package.json'_. 

1. Reemplazar esos archivos autogenerados por los que hay alojados en este repositorio.

1. En la consola de la carpeta, introducir el comando `firebase deploy --only functions`. 
Esto procesará nuestros archivos y los transformará en funciones (en nuestro caso, HTTP) que podemos invocar fácilmente.

1. Cuando haya finalizado el proceso, nos aparecerá la URL mediante la cual podemos llamar a la función. 
Esta es la dirección que pondremos en Dialogflow.

### ¡Ya hemos acabado este apartado!
