import serveFavicon from "serve-favicon";
import path from "path";
import { app } from './settings'
require("dotenv").config();


const { PORT } = process.env;
app.use(serveFavicon(path.join("favicon.ico")));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

