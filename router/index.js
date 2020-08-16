import express from 'express';
import widgetsRouter from '../modules/widgets/router';
import documentsRouter from '../modules/documents/router';
import usersRouter from '../modules/users/router';
import flowsRouter from '../modules/flows/router';
import statesRouter from '../modules/states/router';
import cardsRouter from '../modules/cards/router';
import {WIDGETS_ENDPOINT} from '../modules/widgets/const';
import {USERS_ENDPOINT} from '../modules/users/const';
import {FLOWS_ENDPOINT} from '../modules/flows/const';
import {STATES_ENDPOINT} from '../modules/states/const';
import {CARDS_ENDPOINT} from '../modules/cards/const';
import {DOCUMENTS_ENDPOINT} from '../modules/documents/const';
import {WORKSPACES_ENDPOINT} from '../modules/workspaces/const';
import workspacesRouter from '../modules/workspaces/router';

const router = express.Router();

router.use(WIDGETS_ENDPOINT, widgetsRouter);

router.use(DOCUMENTS_ENDPOINT, documentsRouter);

router.use(USERS_ENDPOINT, usersRouter);

router.use(FLOWS_ENDPOINT, flowsRouter);

router.use(STATES_ENDPOINT, statesRouter);

router.use(CARDS_ENDPOINT, cardsRouter);

router.use(WORKSPACES_ENDPOINT, workspacesRouter);

router.get('/', (req, res) =>
	res.send(req.__('Hello world!'))
);

export default router;
