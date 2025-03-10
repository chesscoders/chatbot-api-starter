# ChatBot API Starter

Starter for ChatBot APIs, created using the [Express Mongo API starter](https://github.com/victorocna/express-mongo-api-starter). With chatbot functionalities added on top.

## Database setup

1. Go to [MongoDB Cloud](https://www.mongodb.com/products/platform/cloud) and sign in using the credentials from [Mega](https://mega.nz/).
2. Create a new project.
3. Inside your new project, create a cluster.
4. Having your new cluster selected, click "Browse collections" in the same panel as the selected cluster.
5. Create a new database and a new collection. (name examples: `test` for database and `knowlegde_base` for collection)
6. In your new collection, go to Atlas Search.
7. Create Search Index, select the newly created database, Type: Atlas Search, Index Name: default, Configuration: JSON Editor and paste the following object:

```
{
  "mappings": {
    "fields": {
      "embedding": {
        "dimensions": 1536,
        "similarity": "cosine",
        "type": "knnVector"
      },
      "tag": {
        "type": "token"
      }
    }
  }
}
```

8. Create another Search Index, Type: Vector Search, Index Name: vector_index, Configuration: JSON Editor and paste the following object:

```
{
  "fields": [
    {
      "numDimensions": 1536,
      "path": "embedding",
      "similarity": "cosine",
      "type": "vector"
    }
  ]
}
```

## Documentation and wiki

Refer to the `examples` folder for code examples regarding controllers, models, routes and seeds for "to do" items.

## Quick start

Install dependencies

```bash
npm ci
```

Copy the example environment variables

```bash
cp .env.example .env
```

Optional: Add seeds to your Mongo database

```bash
npm run seed
```

Start the local server

```bash
npm run dev
```

## Environment variables worth mentioning

| Variable Name                 | Description                                                              |
| ----------------------------- | ------------------------------------------------------------------------ |
| MONGODB_ATLAS_URI             | The connection string to the cluster                                     |
| MONGODB_ATLAS_DB_NAME         | Name of the database inside the cluster                                  |
| MONGODB_ATLAS_COLLECTION_NAME | The name of the collection where the bot's knowledge is stored           |
| OPENAI_API_KEY                | API key for the OPENAI API, used for operations involving ChatGPT        |
| HEYGEN_API_KEY                | API key for Heygen API, used for generating the chatbot's talking avatar |

## Scripts explained

### pdf-to-docs.js

This script is used for scraping data from a .pdf file and save it to a JSON file in the data folder. This data can be inserted into the database using the `add-documents` script. Refer to the next entry on how it works. This script can be run by using the following command:

```
node ./scripts/pdf-to-docs.js
```

### add-documents.js

This script is used for inserting documents into the chatbot's knowledge base. Make sure you have your .json file in your data folder and that it corresponds with the filename in the code. It can be run by using the following command:

```
node ./scripts/add-documents.js
```

## Features

Important features are listed below

### Soft delete

You can use the automatic soft delete feature for any collection in the MongoDB database.

This feature will backup the entire deleted document and prevent it from being permanently deleted.

### Authentication

JSON web tokens (JWT) and HTTP-only cookies are used to facilitate authentication.

### Plugins and integrations

You can use the common integrations from the `plugins` folder: AWS, Netopia, Postmark and Smartbill.

Each common integration has an extensive documentation, code samples and step-by-step instructions.

### Loading and error states

You can append these query params to any route in this API:

- use `&test=loading&wait=5000` to delay any request with 5 seconds
- use `&test=error` to trigger a failed request

Customize the loading time with the `wait` query param which takes the number of miliseconds you want to wait.

This feature is available only for dev environments.

### Recaptcha

You should use the Recaptcha middleware on any public route.
Moreover, you should skip Recaptcha middleware and validation on any private route.

By default Recaptcha will not be enabled when the request has no origin (it is sent through an API).

### Postman collection

You can use the Postman collection from the `postman` folder to explore the API and its routes.

## Further reading

- [https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
- [https://hasura.io/blog/best-practices-of-using-jwt-with-graphql](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql)
