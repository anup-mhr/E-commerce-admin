import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import Connect from "connect-pg-simple";
import session from "express-session";
import authenticate from "./utils/authenticate.js";
import config from "./config/config.js";

AdminJS.registerAdapter({ Database, Resource });
const prisma = new PrismaClient();

const adminOptions = {
  resources: [
    {
      resource: { model: getModelByName("Product"), client: prisma },
      options: {
        properties: {
          id: { isVisible: false },
          image: { type: "string" },
          categoryId: { type: "reference", reference: "Category" },
        },
        listProperties: ["title", "Category", "price", "rating", "image"],
        showProperties: ["title", "Category", "price", "rating", "image"],
        filterProperties: ["title", "Category", "price", "rating"],
      },
    },
    {
      resource: { model: getModelByName("Category"), client: prisma },
      options: {
        listProperties: ["name"],
        showProperties: ["name"],
        editProperties: ["name"],
        filterProperties: ["name"],
      },
    },
  ],
  rootPath: "/admin",
};

const adminJs = new AdminJS(adminOptions);

const ConnectSession = Connect(session);
const sessionStore = new ConnectSession({
  conObject: {
    connectionString: config.dbUrl,
    ssl: process.env.NODE_ENV === "production",
  },
  tableName: "session",
  createTableIfMissing: true,
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: "sessionsecret",
  },
  null,
  {
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    secret: "sessionsecret",
    cookie: {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
    },
    name: "adminjs",
  },
);

export { adminJs, adminRouter };
