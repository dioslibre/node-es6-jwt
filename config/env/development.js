module.exports = {
  postgres: {
    host: "localhost",
    port: 5432,
    database: "project-habous",
  },
  jwt: {
    jwtSecret: "$eCrEt",
    jwtDuration: "2 hours",
  },
};
