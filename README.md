
# E-commerce Admin

A admin portal for simple ecommerce made using adminjs that is able to perform CRUD operation.


## Tech Stack

**Server:** Node, Express

**Admin System:** AdminJs

**Database:** Postgres

**ORM:** Prisma


## Deployment

Clone the project

```bash
  git clone https://github.com/anup-mhr/E-commerce-admin.git
```

Go to the project directory

```bash
  cd E-commerce-admin
```

Install yarn (yarn is compulsory)

```bash
  npm i -g yarn
```

Install dependencies

```bash
  npm run build
```

Mitigrate database

```bash
  npm run db:setup
```

Convert ts files to js

```bash
  npm run build:typescript
```

Start the server

```bash
  npm start
```

Fetch and populate products:

```bash
  GET http://localhost:3000/fetch-products
```

Access the AdminJS dashboard

```bash
  GET http://localhost:3000/admin
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT= 3000`

`DATABASE_URL = postgresql://[user]:[password]@localhost:5432/[database]`

`ADMIN_EMAIL = admin@admin.com`

`ADMIN_PASSWORD = password`

`DATABASE = Ecommerce`
## Authors

- [@Anup Maharjan](https://github.com/anup-mhr)

