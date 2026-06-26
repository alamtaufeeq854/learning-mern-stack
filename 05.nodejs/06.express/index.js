import "dotenv/config";
import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  }),
);

let coffeeData = [];
let nextId = 1;

// add a new coffee
app.post("/coffee", (req, res) => {
  const { name, price } = req.body;
  const newCoffee = { id: nextId++, name, price };

  coffeeData.push(newCoffee);
  res.status(201).send(newCoffee);
});

// get all coffee
app.get("/coffee", (req, res) => {
  res.status(200).send(coffeeData);
});

// get a coffee with a id
app.get("/coffee/:id", (req, res) => {
  const coffee = coffeeData.find((c) => c.id === parseInt(req.params.id));

  if (!coffee) {
    return res.status(404).send("Coffee not found !");
  }
  res.status(200).send(coffee);
});

// update coffee
app.put("/coffee/:id", (req, res) => {
  const coffee = coffeeData.find((c) => c.id === parseInt(req.params.id));

  if (!coffee) {
    return res.status(404).send("Coffee not found !");
  }

  const { name, price } = req.body;
  coffee.name = name;
  coffee.price = price;

  res.status(200).send(coffee);
});

app.delete("/coffee/:id", (req, res) => {
  const index = coffeeData.findIndex((i) => i.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Coffee not found !");
  }

  coffeeData = coffeeData.filter((c) => c.id !== coffeeData[index].id);

  res.status(200).send("Deleted !");
});

app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}...`);
});
