import {PORT} from './const/env';
import express from 'express';
import helmet from 'helmet';
import i18n from 'i18n';
import router from './router/index';
import {BASE_API_ENDPOINT} from "./const";
import "./database";

i18n.configure({
	locales:['en', 'pt-BR', 'pt'],
	directory: __dirname + '/locales'
});

const app = express();

app.use(helmet());

app.use(i18n.init);

app.use(BASE_API_ENDPOINT, router);

app.listen(PORT, () =>
	console.log(`Server running on port ${PORT}`)
);
