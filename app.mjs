import express from "express";
import log from "@ajar/marker";
import morgan from "morgan";

import usersRouter from "./routers/users.router.mjs";

//env
const { PORT, HOST } = process.env;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

app.use((err, req, res, next )=> {
    log.error(err);
    //TODO: log to errors.log file
    res.status(500).json({message:err.message})
})

app.use("*", (req, res) => {
  res.status(404).send(`<h1>path ${req.url} was not found...</h1>`);
});

//start the server
(async () => {
  await app.listen(PORT, HOST);
  log.magenta(`🌎  listening on`, `http://${HOST}:${PORT}`);
})();
