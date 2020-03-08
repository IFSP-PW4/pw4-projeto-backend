import {SERVER_PORT, BASE_API_ENDPOINT} from './const';
import express from "express";
import router from "./router/index";
import i18n from "i18n";

i18n.configure({
    locales:['en', 'pt'],
    directory: __dirname + '/locales'
});

const app = express();
app.use(i18n.init);

app.use(BASE_API_ENDPOINT, router);

app.listen(SERVER_PORT, () =>
    console.log(`Server running on port ${SERVER_PORT}`)
);
