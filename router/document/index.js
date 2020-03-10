import express from 'express';
import { DOCUMENTS_ENDPOINT as endpoint } from '../../const';

const documentsRouter = express.Router();
const resourceType = 'document';

documentsRouter.get('/', (req, res) => {
	res.send(req.__('Hello from {{ endpoint }}', {
		endpoint
	}));
});

documentsRouter.get('/:docId', (req, res) => {
	const { docId: id } = req.params;

	res.send(req.__('Getting {{ resourceType }} resource with id {{ id }}', {
		resourceType,
		id
	}));
});

documentsRouter.post('/', (req, res) => {
	res.send(req.__('Saving new document...'));
});

documentsRouter.put('/:docId', (req, res) => {
	const { docId: id } = req.params;

	res.send(req.__('Updating {{ resourceType }} resource with id {{ id }}', {
		resourceType,
		id
	}));
});

documentsRouter.delete('/:docId', (req, res) => {
	const { docId: id } = req.params;

	res.send(req.__('Deleting {{ resourceType }} resource with id {{ id }}', {
		resourceType,
		id
	}));
});

export default documentsRouter;