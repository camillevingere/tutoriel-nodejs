# Tutoriel NodeJS : Débutant

C'est un projet simple pour un tutoriel YouTube d'API NodeJS.

Je te conseille de visionner cette vidéo si tu ne l'a pas déjà fait : [![Tutoriel NodeJS Débutant](https://www.media.codympia.com/wp-content/uploads/2024/08/miniature-tutoriel-nodejs.webp)](https://youtu.be/grINk4utVEg)

**Node** est le **_runtime_** qui permet d'écrire toutes nos tâches côté serveur, en JavaScript, telles que la logique métier, la persistance des données et la sécurité. Node ajoute également des fonctionnalités que le JavaScript du navigateur standard ne possède pas, comme par exemple l'accès au système de fichiers local.

## Créer un serveur

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Voilà la réponse du serveur !");
});

server.listen(process.env.PORT || 3000);
```

Pour le lancer :

`node server`

Installer nodemon pour ne pas avoir à redémarrer le serveur manuellement :

`npm install -g nodemon`

## Express

Coder en node.js peut être long et laborieux. C'est pourquoi on va utiliser Express qui est un framework node.js.

### Créer un serveur [[Express]] Node.js

`npm install express`

```js
// /app.js

const express = require("express");

const app = express();

module.exports = app;
```

```javascript
// /server.js

const http = require("http");
const app = require("./app");

// Renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// On créé le serveur HTTP
const server = http.createServer(app);

// On lance l'errorHandler en cas d'erreur côté serveur
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// On écoute sur le port défini précédemment
server.listen(port);
```

Donc là on a créé un serveur Express.

### Créer une route GET

```javascript
// /app.js

const express = require("express");

const app = express();

// Set des headers
app.use((req, res, next) => {
  // Permet d'accéder à notre API depuis n'importe quelle origine ( `'*'` )
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // Permet d'envoyer des requêtes avec les méthodes mentionnées
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Ici peu importe la méthode (GET, POST et autre), elle passera par ce middleware
app.use("/api/stuff", (req, res, next) => {
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff);
});
```

### Créer une route POST

Il faut parser le body :

```js
// Parse du body
app.use(express.json());
```

```javascript
// /app.js

const express = require("express");

const app = express();

// Set des headers
app.use((req, res, next) => {
  // Permet d'accéder à notre API depuis n'importe quelle origine ( `'*'` )
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // Permet d'envoyer des requêtes avec les méthodes mentionnées
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// En changeant en .get au lieu de .use ce middleware sera lancé uniquement avec une requête de la méthode GET
// Sinon on peut garder la méthode .use par défaut mais il faudra la mettre tout à la fin
app.get("/api/products", (req, res, next) => {
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff);
});

// La même URL mais lancée uniquement en méthode POST
app.post("/api/products", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Objet créé !",
  });
});
```

## Base de données : [[MongoDB]]

MongoDB est une base de données **NoSQL**. Cela signifie que l'on *ne peut pas* utiliser SQL pour communiquer avec. Les données sont stockées comme des **collections** de **documents** individuels décrits en JSON (JavaScript Object Notation). Il n'y a pas de schéma strict de données (on peut écrire, en gros, ce que l'on veut où l'on veut), et il n'y a pas de relation concrète entre les différentes données. Cependant, il existe des outils (que vous découvrirez rapidement !) pour nous aider à subvenir à ces besoins.

Les avantages principaux de MongoDB sont son **évolutivité** et sa **flexibilité**. Le site officiel décrit MongoDB comme étant "construit pour des personnes qui construisent des applications Internet et des applications métier qui ont besoin d'évoluer rapidement et de grandir élégamment". La compétence MongoDB est donc très recherchée dans les startups et PME. Un autre avantage est la facilité avec laquelle on communique avec la base de données avec JavaScript, avec les documents décrits en JSON. Cela vous permet d'appliquer les connaissances JS que vous avez déjà à la couche base de données !

`npm install mongoose`

> [!NOTE]
>
> **Mongoose** est un package qui facilite les interactions avec notre base de données MongoDB. Il nous permet de :
>
> - **valider** le format des données ;
> - gérer les **relations** entre les documents ;
> - **communiquer** directement avec la base de données pour la lecture et l'écriture des documents.
>
> Tout cela nous permet de dépasser plusieurs des obstacles que l'on peut rencontrer avec des bases de données NoSQL, et d'appliquer nos connaissances en JavaScript à une base encore plus fonctionnelle !

```javascript
// Pour se connecter à la base de données MongoDB
mongoose
  .connect(
    "mongodb+srv://jimbob:<PASSWORD>@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
```

### Création d'un modèle de données

```javascript
// /models/product.js

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
```

### Enregistrement dans la base de données

```javascript
// /app.js
// On peut importer le modèle
const Product = require("./models/product");

// Pour créer un objet de modèle Product
app.post("/api/products", (req, res, next) => {
  delete req.body._id;
  const product = new Product({
    ...req.body,
  });
  product
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});
```

> [!NOTE]
> La base de données MongoDB est fractionnée en **collections** : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera `Things`

### Récupération de la liste de Produits

```javascript
app.use("/api/products", (req, res, next) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(400).json({ error }));
});
```

### Récupération d'un produit spécifique par ID

```javascript
app.get("/api/products/:id", (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json(product))
    .catch((error) => res.status(404).json({ error }));
});
```

### Mettre à jour un produit existant

```js
app.put("/api/products/:id", (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});
```

### Suppression d'un produit

```js
app.delete("/api/products/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});
```

## Routing

Créez, dans votre dossier `backend` , un dossier `routes` puis, dans ce nouveau dossier, un fichier `products.js` . Celui-ci contiendra la logique de nos routes `product` :

```js
const express = require("express");

const router = express.Router();

module.exports = router;
```

Il est temps de couper toutes nos routes de `app.js` et de les coller dans notre routeur. Veillez à remplacer toutes les occurrences de `app` par `router` , car nous enregistrons les routes dans notre routeur.

```js
// /app.js

const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);
```

Créez un dossier `controllers` dans votre dossier `backend` et créez un autre fichier `products.js` . Celui-ci sera notre contrôleur `products` . Copions le premier élément de logique métier de la route POST vers notre contrôleur :

```js
// in controllers/stuff.js

const Thing = require("../models/thing");

exports.createThing = (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId,
  });
  thing
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
```

Puis dans routes :

```js
// in routes/stuff.js

const stuffCtrl = require("../controllers/stuff");

router.get("/", stuffCtrl.getAllStuff);
```
