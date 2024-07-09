import express from "express";
import { adminJs, adminRouter } from "./admin.js";
import config from "./config/config.js";
import productRouter from "./routes/product.route.js";

const app = express();
const PORT = config.port;

//MIDDLEWARES
app.use(express.json()); //for parsing json

app.use("/", productRouter);

app.use(adminJs.options.rootPath, adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`AdminJS started on http://localhost:${PORT}${adminJs.options.rootPath}`);
});
