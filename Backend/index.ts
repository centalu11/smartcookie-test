import Express from "express";
import * as dotenv from "dotenv";
import routes from "./src/routes";
import { FirebaseService } from "./src/services";

dotenv.config();
FirebaseService.initialize();

const port = process.env.PORT || 8000;

const app = Express();
app.use(Express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`App Started at PORT ${port}`);
});
