import express from "express";
import widgetRouter from './widget/index';
import {WIDGETS_ENDPOINT} from "../const";

const router = express.Router();

router.use(WIDGETS_ENDPOINT, widgetRouter);

router.get('/', (req, res) =>
    res.send(req.__('Hello world!'))
);

export default router;