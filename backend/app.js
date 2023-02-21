const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db");
const db = require("./models");
const init = require("./init");

const swaggerUi = require("swagger-ui-express");
const openApiDocumentation = require("./openApiDocumentation");

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    init.init();
  })
  .catch((err) => {
    console.log("error to connect to MongoDB.", err);
    process.exit();
  });

// db.mongoose
//   .connect(
//     `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     init.init();
//   })
//   .catch((err) => {
//     console.log("Error to connect to MongoDB.");
//     process.exit();
//   });

app.get("/", function (req, res) {
  res.send("Hello World");
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/indiceSource.routes")(app);
require("./routes/balanceIndividual.routes")(app);
require("./routes/calculetteEntity.routes")(app);
require("./routes/resolution.routes")(app);
require("./routes/groupe.routes")(app);
require("./routes/contact.routes")(app);

app.use("/explorer", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

module.exports = app;
