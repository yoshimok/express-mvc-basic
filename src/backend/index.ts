import express, { Express } from "express";
import { userRouter } from "./controller/UserController";
import { customLogger } from "./middleware/customLogger";
import { allowCrossDomain } from "./middleware/allowCors";
import path from "path";
import { errorHandler } from "./middleware/errorHandler";

const app: Express = express();

app.use(allowCrossDomain);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use('/user', userRouter); 
// app.post("/crawl", customLogger, nanikaController, customLogger);
// basic
// app.get("/download", downloadFileController);

// errorHandler
app.use(errorHandler);

// static view
// app.use(express.static(path.join(__dirname, "/../statics")));

app.listen(3000, () => console.log("The app listening on http://localhost:3000"));
