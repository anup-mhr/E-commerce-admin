import { Response, Request, NextFunction } from "express";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productController = {
  async populateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { data } = await axios.get("https://dummyjson.com/products");
      const products = data.products;

      for (const product of products) {
        // Check if the category already exists
        let category = await prisma.category.findFirst({
          where: { name: product.category },
        });

        // If category does not exist, create it
        if (!category) {
          category = await prisma.category.create({
            data: { name: product.category },
          });
        }

        // Create product with reference to category
        await prisma.product.create({
          data: {
            title: product.title,
            price: product.price,
            Category: {
              connect: { id: category.id },
            },
            rating: product.rating,
            image: product.images[0] || "",
          },
        });
      }

      res.status(200).json({ message: "Products fetched and stored successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
      console.log(error);
    }
  },
};

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});
