# Prueba de Desarrollador Full Stack JavaScript

### Objetivo

Desarrollar una aplicación web para gestionar productos (teléfonos móviles) utilizando Node.js para el backend y React para el frontend. El backend debe proporcionar servicios externos que permitan a los clientes consumir la lista de productos e insertar nuevos productos.

### Requisitos

#### Backend (Node.js)

- Crear una API RESTful para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de productos.
- Utilizar Express.js para el enrutamiento.
- Utilizar Sequelize para interactuar con la base de datos.
- Utilizar Postgres de Vercel como base de datos.
- Exponer una ruta exclusiva para permitir que clientes externos de la aplicación consuman los productos; estas rutas deben utilizar algún tipo de autorización.
- Exponer una ruta exclusiva para permitir que clientes externos de la aplicación inserten productos; estas rutas deben utilizar algún tipo de autorización.
- Exponer api-docs utilizando Swagger (https://lexart-server.onrender.com/api-docs).
- Crear un procedimiento que permita la eliminación de todos los productos en segundo plano.
- Crear un procedimiento que permita cargar 50 productos de prueba.

#### Frontend (React - Vite)

- Crear un formulario para registro e inicio de sesión.
- Crear una interfaz de usuario para mostrar los productos y permitir que el usuario realice operaciones CRUD disponibles solo para usuarios que hayan iniciado sesión.
- Implementar rutas para navegar entre las diferentes vistas (lista de productos, agregar producto, editar producto, logs).
- Utilizar servicios para consumir la API RESTful creada en el backend.
- Al hacer clic en “Cargar productos de prueba”, añadir 50 productos.
- Al hacer clic en “Eliminar todos los productos”, ejecutar el procedimiento de eliminación y mostrar una barra de progreso del 0 al 100% que se actualice en tiempo real.
- Mostrar una lista de los productos eliminados en una pantalla llamada logs dentro del sitio.

### Requisitos Adicionales

- La aplicación debe tener una página para inicio de sesión y registro. (Proveer un usuario de prueba)
- La aplicación debe tener una página principal donde se muestren todos los productos disponibles y sus detalles; el acceso a esta página es solo posible con el inicio de sesión del usuario.
- Debe ser posible agregar nuevos productos.
- Debe ser posible editar los productos existentes.
- Debe ser posible eliminar productos.
- Añadir funcionalidades de búsqueda y filtrado de productos.
- Debe ser posible listar los productos desde las APIs externas.
- Debe haber un botón para cargar 50 productos.
- Debe haber un botón para eliminar todos los productos del sitio.
- Debe haber una barra de progreso mostrando el estado de la eliminación del 0 al 100%.
- Debe haber una pantalla llamada logs donde se pueda ver los productos que han sido eliminados.

### Deploy

- [Backend en Render](https://lexart-server.onrender.com)
- [Frontend en Render](https://lexart-front.onrender.com)

El desploy se hace en **Render**, porque la version Hobby de Vercel no permite el uso de WebSocket".

Usuario de prueba -> **email: admin@admin.com password: admin1234**



