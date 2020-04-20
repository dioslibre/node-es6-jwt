module.exports = {
  postgres: {
    host: "localhost",
    port: 5432,
    database: "sig-habous",
  },
  jwt: {
    jwtSecret: "$eCrEt",
    jwtDuration: "2 hours",
  },
};
