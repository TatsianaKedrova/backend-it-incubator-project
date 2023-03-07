"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
require("dotenv").config();
const { PORT } = process.env;
// //example
// let orders = [341, 454, 198, 264, 307];
// let totalOrders = 0;
// for (let i = 0; i <= orders.length; i++) {
//   totalOrders += orders[i];
// }
// console.log(totalOrders);
// app.use(favicon("./favicon.ico"));
const d = app.use((0, serve_favicon_1.default)(path_1.default.join('favicon.ico')));
app.get("/", (req, res) => {
    const a = 17;
    if (a > 5) {
        console.log("a: ", a);
        res.send("Tania is a brilliant developer!");
    }
    else {
        console.log("a: ", a);
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
//# sourceMappingURL=index.js.map