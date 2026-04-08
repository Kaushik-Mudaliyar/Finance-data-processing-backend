import "dotenv/config"
import {connectDb} from "./src/db/db.js"
import { app } from "./src/app.js";

connectDb()
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
