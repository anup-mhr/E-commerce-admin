import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";

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

const adminRouter = AdminJSExpress.buildRouter(adminJs);

export { adminJs, adminRouter };
