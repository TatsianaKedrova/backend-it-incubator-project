import serveFavicon from "serve-favicon";
import path from "path";
import { app } from './settings'
require("dotenv").config();


const { PORT } = process.env;
app.use(serveFavicon(path.join("favicon.ico")));

app.listen(PORT, () => {
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


