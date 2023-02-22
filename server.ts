const http = require("http");
const express = require("express");
const port = 3003;
const fs = require("fs");
import * as dotenv from "dotenv";

let app = express();

console.log("app: ", app);

const newVar = dotenv.config;
console.log("newVar: ", newVar);



// app.get("/", (req, res) => {
//   res.send("Get Request Called");
// });

// const delay = (ms: number) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   });
// };

// const readFile = (path: string) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, function (err, data) {
//       if (err) reject(err);
//       else resolve(data);
//     });
//   });
// };

// const server = http.createServer(async (request, response) => {
//   requestsCount++;
//   console.log(request.url);
//   switch (request.url) {
//     case "/":
//     case "/about":
//       try {
//         const data = await readFile("./pages/about.html");
//         response.write(data);
//         response.end();
//       } catch (error) {
//         response.write("something wrong");
//         response.end();
//       }
//       break;

//     case "/home": {
//       await delay(3000);
//       response.write("You are at home page");
//       response.end();

//       break;
//     }

//     default:
//       response.write("404 not found ");
//       response.end();
//   }
// });

// server.listen(port);
