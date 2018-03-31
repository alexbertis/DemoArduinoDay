# Demo Arduino Day Zaragoza 2018
#### Por Alejandro Bertinelli

En este repositorio se incluyen todos los archivos necesarios para reproducir el ejemplo mostrado en el Arduino Day Zaragoza 2018.
Se divide en 5 carpetas esenciales:

* Archivo del asistente de DialogFlow, en formato ZIP, el cual se puede importar en cualquier proyecto de Google.
* Archivo JSON que incluye la plantilla de la base de datos en tiempo real de Firebase, con todos los valores a 0.
* Carpeta con los archivos relativos a la ejecución de Cloud Functions en el backend de Firebase con NodeJS. Es necesario inicializar la carpeta para luego poder introducir los distintos archivos.
* Directorio con el programa de Python y las librerías necesarias para ejecutarlo. No se incluye el archivo JSON con las claves de servicio para el módulo `firebase-admin`.
* Carpeta con el sketch de Arduino que transforma la cadena de texto de la base de datos a distintos valores que asigna a las LEDs (HARDCODED)
