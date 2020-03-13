import express from 'express';
import {WIDGETS_ENDPOINT, DOCUMENTS_ENDPOINT} from '../const';
import widgetRouter from './widget/index';
import documentsRouter from './document/index';

const router = express.Router();

router.use(WIDGETS_ENDPOINT, widgetRouter);

router.use(DOCUMENTS_ENDPOINT, documentsRouter);

//Calma Vander, nao me espanque... to aprendendo.
router.use("/user", require("./user/index"));

router.get('/', (req, res) =>
	res.send(req.__('Hello world!'))
);



export default router;