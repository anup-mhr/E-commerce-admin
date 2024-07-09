import config from "../config/config.js";

const authenticate = async (email: string, password: string) => {
  if (email === config.admin.email && password === config.admin.password) {
    return Promise.resolve(config.admin);
  }
  return null;
};

export default authenticate;
