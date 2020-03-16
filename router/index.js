import express from 'express';
import {WIDGETS_ENDPOINT, DOCUMENTS_ENDPOINT, FLOW_MANAGEMENT_ENDPOINT} from '../const';
import widgetRouter from './widget/index';
import documentsRouter from './document/index';
import flowManagementRouter from './flow-management';

const router = express.Router();

router.use(WIDGETS_ENDPOINT, widgetRouter);

router.use(DOCUMENTS_ENDPOINT, documentsRouter);

router.use(FLOW_MANAGEMENT_ENDPOINT, flowManagementRouter);

router.get('/', (req, res) =>
	res.send(req.__('Hello world!'))
);

export default router;