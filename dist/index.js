"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const path_1 = __importDefault(require("path"));
const settings_1 = require("./settings");
require("dotenv").config();
const { PORT } = process.env;
settings_1.app.use((0, serve_favicon_1.default)(path_1.default.join("favicon.ico")));
settings_1.app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
// let x=0
// function c(){
// 	let y=0
// 	return {
// 		inc:()=>{x++;y++},
// 		getX:()=>x,
// 		getY:()=>y
// 	}
// }
// c().inc()
// c().inc()
// console.log(c().getX())
// console.log(c().getY())
//# sourceMappingURL=index.js.map