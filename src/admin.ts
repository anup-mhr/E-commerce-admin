import { Database, Resource, getModelByName } from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";


AdminJS.registerAdapter({ Database, Resource })
const prisma = new PrismaClient()



  const adminOptions = {
    resources: [
      {
      resource: { model: getModelByName('Product'), client: prisma },
      options: {
        properties: {
          id: { isVisible: false },
          image: { type: 'string' },
        },
        listProperties: ['image', 'title', 'category', 'price', 'rating'],
        showProperties: ['image', 'title', 'category', 'price', 'rating'],
        editProperties: ['image', 'title', 'category', 'price', 'rating'],
        filterProperties: ['title', 'category', 'price', 'rating'],
      },
    },
    {
      resource: { model: getModelByName('Category'), client: prisma },
      options: {
        properties: {
          id: { isVisible: false },
        },
        listProperties: ['name'],
        showProperties: ['name'],
        editProperties: ['name'],
        filterProperties: ['name'],
      },
    }
  ],
  rootPath: '/admin',
  }

  const adminJs = new AdminJS(adminOptions);

  const adminRouter = AdminJSExpress.buildRouter(adminJs);


export {adminJs, adminRouter};