# [DSI] Práctica 12 - API Node/Express de gestión de información musical - Grupo Q

## Índice
- [1. Introducción.](#introduccion)
- [2. Desarrollo.](#desarrollo)
  - [2.1. Clase Canciones.](#canciones)
  - [2.2. Clase Artistas.](#artistas)
  - [2.2. Clase Playlists.](#playlists)
- [3. Routers.](#routers)
  - [3.1. Router Default.](#routerdefault)
  - [3.2. Routers Canciones, artistas y playlists.](#routers2)
- [4. MongoDB.](#mongodb)
  - [4.1. Mongoose.](#mongoose)
  - [4.2. ThunderClient.](#thunderclient)
  - [4.3. MongoDB Atlas.](#mongoatlas)
  - [4.4. Heroku.](#heroku)
- [5. Workflow con Github Actions e integración continua.](#workflow)
- [6. Dificultades y conclusión.](#conclusion)
- [7. Referencias.](#referencias)

## 1. Introducción. <a name="introduccion"></a>

El objetivo de esta práctica es implementar de forma grupal una API REST haciendo uso de **Node/Express**, **Mongoose** y el módulo de **ThunderClient** para crear, eliminar, modificar y leer con operaciones **CRUD** una serie de canciones, artistas y playlists. Para llevar a cabo esta implementación partimos de los conocimientos y código desarrollado en la anterior práctica grupal.

Para obtener una explicación más extensa y detallada recomendamos revisar el [guión de la práctica 12.](https://ull-esit-inf-dsi-2122.github.io/prct12-music-api/)

## 2. Desarrollo. <a name="desarrollo"></a>

Para este práctica hemos utilizado las diferentes clases que hemos implementado en la primera práctica grupal, modificando las mismas para que acepten los métodos *http* que permitirán **añadir, eliminar, modificar y leer objetos** pertenecientes a cada clase.

Además, se hace uso de Mongoose para implementar la base de datos que contendrá los objetos de cada clase, con **ThunderClient** podremos administrar las operaciones que se realizarán, luego **MongoDB Atlas** nos permitirá utilizar la Base de datos alojada en la nube y finalmente **Heroku** pública este servicio.

Por lo que será necesario dividir la carpeta `src` en varias subcarpetas:

- [`models`]() donde se encontrarán los ficheros correspondiente a los schemas que realizaremos.
- [`routers`]() donde especificamos las operaciones que realizara la base de datos.
- [`db`]() que contendrá el archivo encargado de establecer la conexión al servidor de MongoDB. 
- [`index.ts`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/src/index.ts) que será el fichero que defina el esquema y modelo de datos con Mongoose. 

### 2.1. Clase Canciones. <a name="canciones"></a>

### 2.2. Clase Artistas. <a name="artistas"></a>

### 2.3. Clase Playlists. <a name="playlists"></a>

## 3. Routers. <a name="routers"></a>

En la ruta [`src/routers`](https://ull-esit-inf-dsi-2122.github.io/prct11-async-sockets/) se especifica las funciones **get, post, patch, delete** encargadas de *leer, añadir, modificar y eliminar* para cada uno de los objetos contemplados en la aplicación: canciones, artistas y playlists. Para ello, tenemos separados en 3 ficheros diferentes (una para cada tipo) esas funciones.

### 3.1. Router Default. <a name="routerdefault"></a>

En el fichero [src/routers/default.ts]() contiene únicamente un router con una sentencia y una ruta genérica simbolizada con `*`. El propósito de esto es el de crear un receptor por defecto para todas esas peticiones erróneas, ya sea porque se realizan a una ruta no soportada o usando un tipo de mensaje incorrecto. Todas esas peticiones que no encajan en las demás, son respondidas con un status *501*.

### 3.2. Routers Canciones, artistas y playlists. <a name="routers2"></a>



## 4. MongoDB. <a name="mongodb"></a>

MondoDB es una tecnología que nos permite la creación y administración de bases de datos. Su módulo para el código incluye las funciones de conexión y gestión de peticiones relativas a la base de datos.

Tiene una extensión para Visual Studio Code, y es la que hemos usado para poder interactuar con una base de datos a nivel local, pues es mucho más sencillo que desplegar una en la nube.

La tecnología tiene estas dos partes, que juntas suponen una herramienta potente para trabajar con bases de datos.

### 4.1. Mongoose. <a name="mongoose"></a>

El módulo de Mongoose nos permite modelar objetos. Con estos conseguimos que nuestros datos puedan ser almacenados en la base de datos de MongoDB. Se ha definido un **Schema** para los distintos objetos.



### 4.2. ThunderClient. <a name="thunderclient"></a>

Thunder Client es una extensión de Visual Studio Code que nos permite interactuar con una `API`, realizando diferente peticiones a la misma y así poder comprobar su funcionalidad.

La extensión es simple, clara y directa, y tiene funcionalidades muy interesantes, como crear entornos que almacenan variables o colecciones de comandos donde almacenar plantillas.



### 4.3 MongoDB Atlas. <a name="mongoatlas"></a>

Esta tecnología es el paso lógico de MongoDB Atlas. Si la tecnología original era una serie de herramientas en forma de funciones para interactuar con una base de datos, y que hacía una gran pareja con la extensión de VSC que nos permite tener una base de datos local, el siguiente paso es ofrecer este almacenamiento de manera online/en la nube.

**MongoDB Compass** es una aplicación externa a Visual Studio Code, que nos permite crear un Cluster a través de la página web de MongoDB Atlas, donde podremos almacenar nuestras bases de datos en la nube. Posteriormente, podremos acceder a este Cluster usando la aplicación e indicando la dirección de Atlas.

De esta manera, tenemos una aplicación que nos permite acceder a la base de datos alojada en la nube y observar los contenidos allí almacenados.

### 4.4. Heroku. <a name="heroku"></a>

Una vez se ha creado el *Cluster* que usaremos para almacenar los datos, vamos a utilizar Heroku para desplegar nuestra **API REST**.

Antes de comenzar propiamente con Heroku es necesario hacer algunos cambios en los ficheros [`src/db/mongoose.ts`]() y [`package.json`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/package.json).



## 5. Workflow con Github Actions e integración continua.. <a name="workflow"></a>

Se ha seguido el tutorial propuesto por el profesor.

- Este primer paso es para la configuración para ejecutar el código y las pruebas en distintas versión de Node.js y comprobar su funcionamiento siguiendo el **[Tutorial Typescript ejecutado en Node.js](https://drive.google.com/file/d/1hwtPovQlGvthaE7e7yYshC4v8rOtLSw0/view)**

[Acceso al tests.js.yml](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/.github/workflows/tests.js.yml)

- Una vez realizado el tutorial, en nuestro directorio `.github/workflows` crearemos el fichero `coveralls.yml` siguiendo el **[Tutorial Workflow GH Actions Coveralls](https://drive.google.com/file/d/1yOonmpVbOyvzx3ZbXMQTAPxvA3a7AE7w/view)**

[Acceso al coveralls.yml](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/.github/workflows/coveralls.yml)

- Una vez realizado el tutorial, en nuestro directorio `.github/workflows` crearemos el fichero `sonarcloud.yml`, para ello seguimos este **[Tutorial Workflow GH Actions Sonar-Cloud](https://drive.google.com/file/d/1FLPargdPBX6JaJ_85jNsRzxe34sMi-Z3/view)**

[Acceso al sonarcloud.yml](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101128894/blob/master/.github/workflows/sonarcloud.yml)

- Para finalizar, se creará un fichero llamado **sonar-project.propierties**

[Acceso al sonar-project.propierties](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/sonar-project.properties)

## 6. Dificultades y conclusión. <a name="conclusion"></a>

## 7. Referencias. <a name="referencias"></a>

- [Guión práctica 12](https://ull-esit-inf-dsi-2122.github.io/prct12-music-api/)
- [Apuntes sobre Node.js](https://ull-esit-inf-dsi-2122.github.io/nodejs-theory/nodejs-intro.html)
- [Apuntes sobre MongoDB](https://www.mongodb.com/es)
- [Apuntes sobre Mongoose](https://mongoosejs.com/)
- [Apuntes sobre API REST](https://ull-esit-inf-dsi-2122.github.io/nodejs-theory/nodejs-rest-api.html)
- [Apuntes sobre Despliegue del Api REST](https://ull-esit-inf-dsi-2122.github.io/nodejs-theory/nodejs-deployment.html)







