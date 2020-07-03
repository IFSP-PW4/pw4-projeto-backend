import express from 'express';
import widgetsRouter from '../modules/widgets/router';
import documentsRouter from '../modules/documents/router';
import usersRouter from '../modules/users/router';
import flowsRouter from '../modules/flows/router';
import {WIDGETS_ENDPOINT} from "../modules/widgets/const";
import {USERS_ENDPOINT} from "../modules/users/const";
import {FLOWS_ENDPOINT} from "../modules/flows/const";
import {DOCUMENTS_ENDPOINT} from "../modules/documents/const";

const router = express.Router();

router.use(WIDGETS_ENDPOINT, widgetsRouter);

router.use(DOCUMENTS_ENDPOINT, documentsRouter);

router.use(USERS_ENDPOINT, usersRouter);

router.use(FLOWS_ENDPOINT, flowsRouter);

router.get('/', (req, res) =>
	res.send(req.__('Hello world!'))
);

export default router;
