import express from 'express';
import {WIDGETS_ENDPOINT as endpoint} from '../../const';

const widgetRouter = express.Router();
const resourceType = 'widget';

widgetRouter.get('/', (req, res) => {
	res.send(req.__('Hello from {{endpoint}}', {
		endpoint
	}));
});

widgetRouter.post('/', (req, res) => {
	res.send(req.__('Saving new widget...'));
});

widgetRouter.get('/:widgetId', (req, res) => {
	const {widgetId: id} = req.params;

	res.send(req.__('Getting {{resourceType}} resource with id {{id}}', {
		resourceType,
		id
	}));
});

widgetRouter.put('/:widgetId', (req, res) => {
	const {widgetId: id} = req.params;

	res.send(req.__('Updating {{resourceType}} resource with id {{id}}', {
		resourceType,
		id
	}));
});

export default widgetRouter;