import express from 'express';
import {
	WIDGETS_ENDPOINT, 
	DOCUMENTS_ENDPOINT,
	USERS_ENDPOINT,
       } from '../const';
import widgetsRouter from './widget/index';
import documentsRouter from './document/index';
import usersRouter from './user/index';

const router = express.Router();

router.use(WIDGETS_ENDPOINT, widgetsRouter);

router.use(DOCUMENTS_ENDPOINT, documentsRouter);

router.use(USERS_ENDPOINT, usersRouter);

router.get('/', (req, res) =>
	res.send(req.__('Hello world!'))
);

export default router;
