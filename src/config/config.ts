import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
};

if (!config.dbUrl) {
  console.error("DB_URL is not defined");
  process.exit(1);
}
if (!config.admin.email || !config.admin.password) {
  console.error("ADMIN_EMAIL or ADMIN_PASSWORD is not defined");
  process.exit(1);
}

export default config;
