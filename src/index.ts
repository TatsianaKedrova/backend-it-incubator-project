import express from "express";
const app = express();
require("dotenv").config();

const { PORT } = process.env;

// //example
// let orders = [341, 454, 198, 264, 307];
// let totalOrders = 0;
// for (let i = 0; i <= orders.length; i++) {
//   totalOrders += orders[i];
// }
// console.log(totalOrders);

app.get("/", (req, res) => {
  const a = 4;
  if (a > 5) {
    res.send("Ok!");
  } else {
    res.send("Hello World!");
  }
});

app.get("/users", (req, res) => {
  res.send("Hello Users!");
});

app.post("/users", (req, res) => {
  res.send("We created a great charismatic woman!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
