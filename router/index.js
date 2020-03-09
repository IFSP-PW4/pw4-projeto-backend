import express from 'express';
import {WIDGETS_ENDPOINT} from '../const';
import widgetRouter from './widget/index';

const router = express.Router();

router.use(WIDGETS_ENDPOINT, widgetRouter);

router.get('/', (req, res) =>
	res.send(req.__('Hello world!'))
);

export default router;