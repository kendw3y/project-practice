export default () => ({
  app: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },
  database: {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
