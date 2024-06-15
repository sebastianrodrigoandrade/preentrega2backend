# Backend

Este es un proyecto de backend desarrollado en Node.js utilizando Express, Handlebars y Socket.io.


Uso
Una vez que el servidor esté en funcionamiento, se puede acceder a las siguientes rutas:

/: Muestra una lista de productos.

/realtimeproducts: Muestra una lista de productos en tiempo real utilizando WebSockets.
Se puede agregar y eliminar productos desde la página de productos en tiempo real.

Estructura del Proyecto
index.js: Punto de entrada del servidor.
package.json: Archivo de configuración del proyecto con las dependencias y scripts necesarios.
views/: Directorio que contiene las plantillas Handlebars para las vistas del servidor.
home.handlebars: Vista para mostrar la lista de productos.
realTimeProducts.handlebars: Vista para mostrar la lista de productos en tiempo real.