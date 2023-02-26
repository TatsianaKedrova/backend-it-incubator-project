"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var express = require("express");
var port = 3003;
var fs = require("fs");
var dotenv = __importStar(require("dotenv"));
var app = express();
console.log("app: ", app);
var newVar = dotenv.config;
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
//# sourceMappingURL=server.js.map