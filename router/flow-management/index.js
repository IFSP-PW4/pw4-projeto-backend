import express from 'express';
import { FLOW_MANAGEMENT_ENDPOINT as endpoint } from '../../const/env';

const flowManagementRouter = express.Router();
const resourceType = 'flow management';

flowManagementRouter.get('/', (req, res) => {
	res.send(req.__('Hello from {{ endpoint }}', {
		endpoint
	}));
});

flowManagementRouter.get('/:flowId', (req, res) => {
	const { flowId: id } = req.params;

	res.send(req.__('Getting {{ resourceType }} resource with id {{ id }}', {
		resourceType,
		id
	}));
});

flowManagementRouter.post('/create-flow', (req, res) => {
	res.send(req.__('Creating new flow...'));
});

flowManagementRouter.put('/:flowId', (req, res) => {
	const { flowId: id } = req.params;

	res.send(req.__('Updating {{ resourceType }} resource with id {{ id }}', {
		resourceType,
		id
	}));
});

flowManagementRouter.delete('/:flowId', (req, res) => {
	const { flowId: id } = req.params;

	res.send(req.__('Deleting {{ resourceType }} resource with id {{ id }}', {
		resourceType,
		id
	}));
});

export default flowManagementRouter;