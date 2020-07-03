import express from 'express';
import {WIDGETS_ENDPOINT as endpoint} from '../const';

const widgetsRouter = express.Router();
const resourceType = 'widget';

widgetsRouter.get('/', (req, res) => {
	res.send(req.__('Hello from {{endpoint}}', {
		endpoint
	}));
});

widgetsRouter.post('/', (req, res) => {
	res.send(req.__('Saving new widget...'));
});

widgetsRouter.get('/:widgetId', (req, res) => {
	const {widgetId: id} = req.params;

	res.send(req.__('Getting {{resourceType}} resource with id {{id}}', {
		resourceType,
		id
	}));
});

widgetsRouter.put('/:widgetId', (req, res) => {
	const {widgetId: id} = req.params;

	res.send(req.__('Updating {{resourceType}} resource with id {{id}}', {
		resourceType,
		id
	}));
});

export default widgetsRouter;