module.exports = {
  openapi: "3.0.3",
  info: {
    version: "1",
    title: "Calculateur CO2 API",
    description: "",
    contact: {
      name: "Plaurent",
      email: "paul.adrien.76@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:8080/",
      description: "Local server",
    },
  ],
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  tags: [
    {
      name: "CRUD operations",
    },
  ],
  paths: {
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "x-access-token",
      },
    },
  },
};
