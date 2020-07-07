import express from 'express';
import { FLOWS_ENDPOINT as endpoint } from '../const';

const flowsRouter = express.Router();
const resourceType = 'flow management';

flowsRouter.get('/', (req, res) => {
	res.send(req.__('Hello from {{ endpoint }}', {
		endpoint
	}));
});

flowsRouter.get('/:flowId', (req, res) => {
	const { flowId: id } = req.params;

	res.send(req.__('Getting {{ resourceType }} resource with id {{ id }}', {
		resourceType,
		id
	}));
});

flowsRouter.post('/create-flow', (req, res) => {
	res.send(req.__('Creating new flow...'));
});

flowsRouter.put('/:flowId', (req, res) => {
	const { flowId: id } = req.params;

	res.send(req.__('Updating {{ resourceType }} resource with id {{ id }}', {
		resourceType,
		id
	}));
});

flowsRouter.delete('/:flowId', (req, res) => {
	const { flowId: id } = req.params;

	res.send(req.__('Deleting {{ resourceType }} resource with id {{ id }}', {
		resourceType,
		id
	}));
});

export default flowsRouter;