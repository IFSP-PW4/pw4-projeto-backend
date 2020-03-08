import {SERVER_PORT} from './const';
import express from "express";
import router from "./router/index";

const app = express();

app.use('/', router);

app.listen(SERVER_PORT, () =>
    console.log(`Server running on port ${SERVER_PORT}`)
);
