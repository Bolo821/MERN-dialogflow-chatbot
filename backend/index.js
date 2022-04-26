const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const config = require("./config/keys");
const mongoose = require("mongoose");

require("./models/Registration");
require("./models/Demand");
require("./models/Coupons");
require('./models/Order');
require('./models/Drink');
require('./models/Meal');
require('./models/Starter');
require('./models/Dessert');
require('./models/Special');
require('./models/User');
require('./models/Table');

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => {
    const chatbot = require('./chatbot/chatbot');
    console.log("MongoDB connected...");
    chatbot.initChatbot();
  })
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

require("./routes/dialogFlowRoutes")(app);
require("./routes/fulfillmentRoutes")(app);
require('./routes/userRoutes')(app);
require('./routes/orderRoutes')(app);
require('./routes/stockRoute')(app);
require('./routes/tableRoutes')(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server is running at port ', PORT);
});
