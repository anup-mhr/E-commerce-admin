import express from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import {adminJs, adminRouter} from './admin.js';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use(adminJs.options.rootPath, adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`AdminJS started on http://localhost:${PORT}${adminJs.options.rootPath}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
