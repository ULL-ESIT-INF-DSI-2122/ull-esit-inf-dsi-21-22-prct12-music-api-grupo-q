# [DSI] Práctica 12 - API Node/Express de gestión de información musical - Grupo Q

## Índice
- [1. Introducción.](#introduccion)
- [2. Desarrollo.](#desarrollo)
  - [2.1. Clase Canciones.](#canciones)
  - [2.2. Clase Artista.](#artista)
  - [2.2. Clase Playlists.](#playlists)
- [3. Routers.](#routers)
  - [3.1. Router Default.](#routerdefault)
  - [3.2. Routers Canciones, artistas y playlists.](#routers2)
    - [3.2.1. Tipo Get.](#get)
    - [3.2.2. Tipo Post.](#post)
    - [3.2.3. Tipo Patch.](#patch)
    - [3.2.4. Tipo Delete.](#delete)
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

- [`models`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/tree/master/src/models) donde se encontrarán los ficheros correspondiente a los schemas que realizaremos.
- [`routers`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/tree/master/src/routers) donde especificamos las operaciones que realizara la base de datos.
- [`db`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/tree/master/src/db) que contendrá el archivo encargado de establecer la conexión al servidor de MongoDB. 
- [`index.ts`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/src/index.ts) que será el fichero que defina el esquema y modelo de datos con Mongoose. 

### 2.1. Clase Canciones. <a name="canciones"></a>

En la ruta [`src/models/canciones.ts`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/src/models/canciones.ts) se especifica lo que tendrá canción:

```ts
interface CancionInterface extends Document {
  nombre: string,
  autor: string,
  duracion: string,
  generos: string[],
  single: boolean,
  reproducciones: number
}

const CancionSchema = new Schema({
  nombre: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El nombre de una cancion debe comenzar por mayuscula.');
      } else if (!validator.isAlphanumeric(value)) {
        throw new Error('El nombre de una cancion solo puede contener caracteres alfanumericos');
      }
    },
  },
  autor: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El autor de una cancion debe comenzar por mayuscula.');
      } else if (!validator.isAlphanumeric(value)) {
        throw new Error('El autor de una cancion solo puede contener caracteres alfanumericos');
      }
    },
  },
  duracion: {
    type: String,
    required: true,
    trim: true,
  },
  generos: {
    type: [String],
    required: true,
  },
  single: {
    type: Boolean,
    required: true,
  },
  reproducciones: {
    type: Number,
    required: true,
  },
});
```

Donde se define el esquema de la clase, este es el mecanismo por el cual podemos modelar un objeto en Mongoose, es decir, el objeto `CancionSchema`, se define las características que tiene la canción, **su nombre, el autor, el genero, el single y las reproducciones**.

Cabe destacar que los atributos de **nombre** y **autor** tienen una función `validate`, la cual recibe el contenido a almacenar y realiza una comprobación. En ambos casos, esta comprobación se realiza a través de una expresión regular, que comprueba si la primera letra del string es una letra mayúscula contemplada en el alfabeto español.

En la última línea se aplica el método `model` que va a especificar el esquema que debe seguir los objetos antes de ser insertados en una colección de la base de datos.

```ts
export const Cancion = model<CancionInterface>('Cancion', CancionSchema);
```

### 2.2. Clase Artista. <a name="artista"></a>

En la ruta [`src/models/artista.ts`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/src/models/artista.ts), se puede observar que la clase está formado por un nombre, generos, canciones y oyentes mensuales.


### 2.3. Clase Playlists. <a name="playlists"></a>

En la ruta [`src/models/playlist.ts`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/src/models/artista.ts), se puede observar que la clase está formado por un nombre, generos, canciones y duración.


## 3. Routers. <a name="routers"></a>

En la ruta [`src/routers`](https://ull-esit-inf-dsi-2122.github.io/prct11-async-sockets/) se especifica las funciones **get, post, patch, delete** encargadas de *leer, añadir, modificar y eliminar* para cada uno de los objetos contemplados en la aplicación: canciones, artistas y playlists. Para ello, tenemos separados en 3 ficheros diferentes (una para cada tipo) esas funciones.


### 3.1. Router Default. <a name="routerdefault"></a>

En el fichero [`src/routers/default.ts`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/src/routers/default.ts) contiene únicamente un router con una sentencia y una ruta genérica simbolizada con `*`. El propósito de esto es el de crear un receptor por defecto para todas esas peticiones erróneas, ya sea porque se realizan a una ruta no soportada o usando un tipo de mensaje incorrecto. Todas esas peticiones que no encajan en las demás, son respondidas con un status *501*.

### 3.2. Routers Canciones, artistas y playlists. <a name="routers2"></a>

A pesar de que son estructuras de datos diferentes, las tres son tratadas de la misma manera y usando las mismas funciones. Usaremos como ejemplo la ruta[`src/routers/cancionRouters`]().

#### 3.2.1. Tipo Get. <a name="get"></a>

- Una vez declaramos un nuevo Router de *Express*, esta variable pasa a ser un objeto que tiene varias opciones respecto al tipo de peticiones que puede recibir. En este primer caso, se nos presenta un `get`.

- Este receptor de get se activa cuando se recibe una petición get sobre la ruta `/canciones`. Lo primero que se hace es crear una variable filter, la cual recibe el `name` de la petición (variable `req`). De ella extrae este valor transformándolo a **string**.

- Se realiza un `try catch` para realizar una comprobación de manera *asíncrona*. La comprobación la realiza buscando si existe este nombre `filter` dentro de todos los elementos de tipo `Cancion` que hemos almacenado en la base de datos. En caso de que no lo encuentre, se rompe la promesa y se ejecuta la sentencia `return res.status(500).send();`. En caso contrario, se devuelve al cliente todos los datos que coincidieron.

- La sentencia `await` "paraliza" la ejecución del programa para darle prioridad al `find()` y que pueda completarse. Una vez finalizada esta operación, el flujo del programa vuelve a la normalidad.

[Acceso al `src/routers/cancionRouters/getCancion.ts`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/src/routers/cancionRouters/getCancion.ts):

```ts
import * as express from 'express';
import { Cancion } from '../../models/canciones';

getCancionRouter.get('/canciones', async (req, res) => {
  const filter = req.query.nombre ? { nombre: req.query.nombre.toString() } : {};

  try {
    const canciones = await Cancion.find(filter);

    if (canciones.length !== 0) {
      return res.send(canciones);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});
```

En la segunda función `get`, lo que hace es buscar por **id** de los diferentes elementos de la base de datos, el propio **model** tiene un método `findById()` al cual entregamos el id y comprueba si existe; devolviendo el resultado después.

```ts
getCancionRouter.get('/canciones/:id', async (req, res) => {
  try {
    const cancion = await Cancion.findById(req.params.id);

    if (!cancion) {
      return res.status(404).send();
    }

    return res.send(cancion);
  } catch (error) {
    return res.status(500).send();
  }
});
```

#### 3.2.2. Tipo Post. <a name="post"></a>

- Las peticiones de tipo `post` simplemente reciben a través de la **promesa req** todos los datos necesarios para crear un nuevo objeto. En este caso, los datos los obtiene de req.body para crear un objeto canciones, en este caso.

- Posteriormente, almacena este nuevo objeto en la base de datos con `cancion.save()`, dándole potestad con **await** para completarse antes de continuar.

[Acceso al `src/routers/cancionRouters/postCancion.ts`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/src/routers/cancionRouters/postCancion.ts):

```ts
postCancionRouter.post('/canciones', async (req, res) => {
  const cancion = new Cancion(req.body);

  try {
    await cancion.save();
    res.status(201).send(cancion);
  } catch (error) {
    res.status(400).send(error);
  }
});
```

#### 3.2.3. Tipo Patch. <a name="patch"></a>

- Para la funcionalidad de modificación hemos usado la etiqueta `patch`. Si en la promesa recibimos algún dato **no autorizado a editar**, **rechazamos la petición**. En caso de que esto falle, lo comunicamos con un error específico.

- Una vez se comprueba que todo es válido, entramos en el `try catch`. Para este caso, la función `findOneAndUpdate()` hace lo que describe: recibe un elemento con el que hacer match (**nombre**, en este ejemplo) entre todos los de la base de datos, y el **body** con todos los datos nuevos a actualizar.

[Acceso al `src/routers/cancionRouters/patchCancion.ts`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/src/routers/cancionRouters/patchCancion.ts):

```ts
patchCancionRouter.patch('/canciones', async (req, res) => {
  if (!req.query.nombre) {
    return res.status(400).send({
      error: 'Se debe proporcionar un nombre',
    });
  }

  const allowedUpdates = ['nombre', 'autor', 'duracion', 'generos', 'single', 'reproducciones'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    const cancion =
      await Cancion.findOneAndUpdate({ nombre: req.query.nombre.toString() }, req.body, {
        new: true,
        runValidators: true,
      });

    if (!cancion) {
      return res.status(404).send();
    }

    return res.send(cancion);
  } catch (error) {
    return res.status(400).send(error);
  }
});
```
- También se ha contemplado el actualizar usando como **match** la `id` del elemento en la base de datos. La función es exactamente igual, excepto por la declaración de la "ruta", la cual ahora debe recibir el *id completo y la función del modelo*, la cual ahora es `findByIdAndUpdate()`, la cual recibe la id.

```ts
patchCancionRouter.patch('/canciones/:id', async (req, res) => {
  ...
  try {
    const cancion = await Cancion.findByIdAndUpdate(req.params.id, req.body, {
     ...
```

#### 3.2.4. Tipo Delete. <a name="delete"></a>

- La última de las **operaciones CRUD** es `delete`, la diferencia es que en vez de `find()`, usa `findOneAndDelete()`, que como indica el nombre, elimina de la base de datos todas las coincidencias que encuentre.

- Para informar al usuario que la operación fue exitosa, le devuelve el objeto eliminado para confirmar que era lo que quería eliminar.

[Acceso al `src/routers/cancionRouters/deleteCancion.ts`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/src/routers/cancionRouters/deleteCancion.ts):

```ts
deleteCancionRouter.delete('/canciones', async (req, res) => {
  if (!req.query.nombre) {
    return res.status(400).send({
      error: 'Se debe proporcionar un nombre',
    });
  }

  try {
    const cancion =
      await Cancion.findOneAndDelete({ nombre: req.query.nombre.toString() });

    if (!cancion) {
      return res.status(404).send();
    }

    return res.send(cancion);
  } catch (error) {
    return res.status(400).send();
  }
});
```
- Esta funcionalidad también contempla el recibir una `id` como método de **match**. La única diferencia real es el uso de `.findByIdAndDelete()`, el cual recibe la id desde la variable de la promesa `req.params.id`.

```ts
deleteCancionRouter.delete('/canciones/:id', async (req, res) => {
  try {
    const cancion = await Cancion.findByIdAndDelete(req.params.id);
      ...
```
- Cabe destacar al principio la funcionalidad de la sentencia *express*, ya que al crear y declarar los métodos lo que hacemos es crear una estructura de datos exportable con *export*. Entonces de esta manera separamos estas funciones por clases y en diferentes ficheros.

```ts
export const deleteCancionRouter = express.Router();
```

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

Antes de comenzar propiamente con Heroku es necesario hacer algunos cambios en los ficheros [`src/db/mongoose.ts`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/src/db/mongoose.ts) y [`package.json`](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/package.json).



## 5. Workflow con Github Actions e integración continua.. <a name="workflow"></a>

Se ha seguido el tutorial propuesto por el profesor.

- Este primer paso es para la configuración para ejecutar el código y las pruebas en distintas versión de Node.js y comprobar su funcionamiento siguiendo el **[Tutorial Typescript ejecutado en Node.js](https://drive.google.com/file/d/1hwtPovQlGvthaE7e7yYshC4v8rOtLSw0/view)**

[Acceso al tests.js.yml](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/.github/workflows/tests.js.yml)

- Una vez realizado el tutorial, en nuestro directorio `.github/workflows` crearemos el fichero `coveralls.yml` siguiendo el **[Tutorial Workflow GH Actions Coveralls](https://drive.google.com/file/d/1yOonmpVbOyvzx3ZbXMQTAPxvA3a7AE7w/view)**

[Acceso al coveralls.yml](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/.github/workflows/coveralls.yml)

- Una vez realizado el tutorial, en nuestro directorio `.github/workflows` crearemos el fichero `sonarcloud.yml`, para ello seguimos este **[Tutorial Workflow GH Actions Sonar-Cloud](https://drive.google.com/file/d/1FLPargdPBX6JaJ_85jNsRzxe34sMi-Z3/view)**

[Acceso al sonarcloud.yml](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/.github/workflows/sonarcloud.yml)

- Para finalizar, se creará un fichero llamado **sonar-project.propierties**

[Acceso al sonar-project.propierties](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-q/blob/master/sonar-project.properties)

## 6. Dificultades y conclusión. <a name="conclusion"></a>

## 7. Referencias. <a name="referencias"></a>

- [Guión práctica 12.](https://ull-esit-inf-dsi-2122.github.io/prct12-music-api/)
- [Apuntes sobre Node.js](https://ull-esit-inf-dsi-2122.github.io/nodejs-theory/nodejs-intro.html)
- [Apuntes sobre MongoDB](https://www.mongodb.com/es)
- [Apuntes sobre Mongoose](https://mongoosejs.com/)
- [Apuntes sobre API REST](https://ull-esit-inf-dsi-2122.github.io/nodejs-theory/nodejs-rest-api.html)
- [Apuntes sobre Despliegue del Api REST](https://ull-esit-inf-dsi-2122.github.io/nodejs-theory/nodejs-deployment.html)