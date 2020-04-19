module.exports = {
  postgres: {
    host: "localhost",
    port: 5432,
    database: "sig-habous",
    username: "root",
    password: "root",
  },
  jwt: {
    jwtSecret: "$eCrEt",
    jwtDuration: "2 hours",
  },
};
