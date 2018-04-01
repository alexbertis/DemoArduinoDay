# Portar el asistente de Dialogflow a tu proyecto
#### Es necesario usar el archivo ZIP situado en este directorio para llevar a cabo la operación.

1. Crear un agente de DialogFlow.
1. Ir a *Ajustes* > *Export and Import* > *Import from ZIP*.
1. Seleccionar el archivo ZIP de este directorio y pulsar *Import*.
1. Esperar a que se configure todo.
1. Se puede cambiar el nombre del agente desde *Ajustes*.
1. Es necesario vincular un Webhook para que el agente invoque una función que le devuelva un resultado. Para ello, debemos ir al apartado *Fullfillment* y desde allí habilitar Webhook si no está activado.
1. Debemos introducir la URL de la función HTTP que queremos invocar. Si usamos Cloud Functions para Firebase, podemos obtener su URL en la Consola de Firebase, en el apartado *Functions*.
1. De vuelta en Dialogflow, hacemos clic en *Save* y tendremos todo configurado.
