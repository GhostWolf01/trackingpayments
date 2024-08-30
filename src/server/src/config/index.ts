export default () => {
  return {
    docker: Boolean(process.env.DOCKER) ?? false,
    host: process.env.HOST ?? 'https://localhost',
    port: Number(process.env.PORT) ?? 3000,
    database: {
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT) ?? 5432,
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      name: process.env.DB_NAME ?? 'db',
    },
    jwtsecret: process.env.JWT_SECRET ?? '',
  } as const;
};
