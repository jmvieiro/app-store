# JMV Store proyecto académico sobre Desarrollo de Aplicaciones - Expo Framework, basado en React Native 

## Comenzando con Expo 

Este proyecto fue inicializado con [Expo] (https://docs.expo.dev/).

npm install --global expo-cli
expo init app-store

## Sobre el proyecto

Este proyecto fue llevado a cabo con fines académicos, tratando de respetar las mejores prácticas obtenidas en clase, en el marco del curso de Desarrollo de Aplicaciones brindado por CoderHouse.

El proyecto consiste en la realización de un e-commerce, denominado JMV Store, a través del cual se podrán probar las principales funcionalidades aprendidas.

Para la realización del proyecto, se instalaron las siguientes dependencias:

- react-native-maps (https://docs.expo.dev/versions/latest/sdk/map-view/) para la visualización de mapas.
- librería de íconos "expo-font" (https://docs.expo.dev/versions/latest/sdk/font/) 
- selector de imágenes "expo-image-picker" (https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- geolocalización "expo-location" (https://docs.expo.dev/versions/latest/sdk/location/)
- acceder a archivos del sistema "expo-file-system" (https://docs.expo.dev/versions/latest/sdk/filesystem/)
- guardado de datos en dispositivo "expo-sqlite" (https://docs.expo.dev/versions/latest/sdk/sqlite/)
- manejo de variables globales en toda la aplicación "redux" (https://react-redux.js.org/)
- carrousel para mostrar novedades o avisos "react-native-snap-carousel" (https://www.npmjs.com/package/react-native-snap-carousel)
- package de "accounting" para dar formato a los precios (https://www.npmjs.com/package/accounting).

### Screens y Components principales

Se definieron 5 (cinco) grandes screens:

#### - User

Invocado al iniciar la aplicación, para registro de nuevos usuarios (Register) y autenticación del usuario (Login).
Se incluye screen de configuración para ver los datos del usuario logueado y permite cerrar la sesión.

#### - Shop

Home: muestra un carrusel de anuncios, con información útil para el usuario, y lista las categorías de los productos incluidos en el store.
Products: ofrece un listado de productos obtenidos de la base de datos, en función a la categoría seleccionada, iterando en los "ListItem".
Detail: muestra el detalle del producto seleccionado, utilizando el compoenente "ItemDetail". 

#### - Cart

Se podrá ver el detalle de los productos incluidos en el carrito y el total a abonar. Los componentes que lo conforman son: "ItemListCheckout" que recibe los productos incluidos en el carrito e itera por cada uno de ellos, mostrando cada producto incluido en el carrito, permitiendo vaciar el carrito, y mostrando el total a abonar.
Incluye el "ModalForm" que permite completar los datos del comprador (nombre, teléfono y correo electrónico), y tiene el botón para finalizar la compra. El botón para finalizar la compra, envía el carrito y los datos del comprador. De cada producto incluido en el carrito se valida la existencia del mismo (si no existe, se indica que hay que eliminar el producto del carrito) y si existe, se valida que haya stock disponible. Si no hay stock disponible se indica que debe ser modificado del carrito, y si hay stock disponible, se actualiza el stock del producto en la base de datos y se genera la orden, entregando al comprador el ID de la transacción.

#### - Orders

Se listan las órdenes generadas por el usuario y almacenadas en la base de datos para seguimiento.

#### - Places

Se listan las direcciones guardadas por el usuario y permite el alta de una nueva dirección.
Para el alta de una nueva dirección se implementó la captura de una imagen representativa y la utilización de los mapas de Google para utilizar la geolocalización.

### Redux

Para el manejo de variables comunes a toda la aplicación se utiliza Redux, a través de actions y reducers, de cada objeto necesario: autenticación (auth), carrito (cart), categorías (category), geolocalización (map), órdenes (order), direcciones (places) y productos (products).

### Firebase

Se generó un repositorio en Firebase para alojar los productos del Store.
Dentro de "/firebase" se incluye el archivo "client.js" donde se configura la conexión y se resuelven todas las consultas de la aplicación:

#### - getCategories

Obtiene las categorías del Store.

#### - getProducts

Obtiene todos los productos del Store con stock mayor a 0.

#### - getCategoryById (id)

Obtiene una categoría por Id.

#### - getProductById (id)

Obtiene un producto por Id.

#### - getProductsByCategory (id)

Obtiene los productos que se corresponde con un Id de categoría.

#### - updateStock (newOrder)

Verifica la existencia de cada producto incluido en el carrito y verifica que haya stock de cada producto.
Si no encuentra algún producto, alerta de esta situación al usuario y no genera la orden.
Si no hay stock disponible de algún producto, alerta de esta situación al usuario y no genera la orden.
Si ambas validaciones son superadas, se actualiza el stock de cada producto y se invoca al "generateOrder".

#### - generateOrder (newOrder)

Genera la orden, persistiendo la misma en la base de datos y otorga al usuario el Id de la transacción generado.

#### - getOrdersByUser (email)

Obtiene las órdenes del usuario logueado.