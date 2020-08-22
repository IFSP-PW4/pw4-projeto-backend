import bodyParser from 'body-parser';
import express from 'express';
import PubSub from 'pubsub-js';
import {DOCUMENT_ADDED, DOCUMENT_DELETED, DOCUMENT_UPDATED} from '../events';
import {Document} from '../model';

const documentsRouter = express.Router();
const jsonParser = bodyParser.json();

documentsRouter.get('/', (req, res) => {
	console.log('Fetching all documents...');

	Document.find((error, documents) => {
		if (error) console.error('Error when attempting to fetch all documents', error);
		else {
			console.log(`Found ${documents.length} documents`);
			return documents;
		}
	})
		.then(documents => res.send(documents))
		.catch(error => res.status(500).send(error));
});

documentsRouter.post('/', jsonParser, (req, res) => {
	const newDocument = new Document({
		...req.body,
	});

	newDocument.save((error, savedWorkspace) => {
		if (error) {
			console.error('Error while saving document', error);
			res.status(500).send(error);
		}

		console.log('Document saved successfully');
		PubSub.publish(DOCUMENT_ADDED, savedWorkspace);
		res.send(savedWorkspace);
	});
});

documentsRouter.get('/:documentId', (req, res) => {
	const {documentId: id} = req.params;

	console.log(`Fetching document with id ${id}`);

	Document.findById(id, (error, document) => {
		if (error) console.error('Error when attempting to fetch document', error);
		else {
			console.log('Document found');
			return document;
		}
	})
		.then(document => res.send(document))
		.catch(error => res.status(500).send(error));
});

documentsRouter.put('/:documentId', jsonParser, (req, res) => {
	const {documentId: id} = req.params;

	console.log(`Updating document with id ${id}`);

	Document.findByIdAndUpdate(id, {...req.body,}, (error, document) => {
		if (error) console.error('Error when attempting to update document', error);
		else {
			console.log('Document updated');
			return document;
		}
	})
		.then((document) => {
			PubSub.publish(DOCUMENT_UPDATED, document);
			res.send(document);
		})
		.catch(error => res.status(500).send(error));
});

documentsRouter.delete('/:documentId', (req, res) => {
	const {documentId: id} = req.params;

	console.log(`Deleting document with id ${id}`);

	Document.findByIdAndDelete(id, (error, document) => {
		if (error) console.error('Error when attempting to delete document', error);
		else {
			console.log('Document deleted');
			return document;
		}
	})
		.then((document) => {
			PubSub.publish(DOCUMENT_DELETED, id);
			res.send(document);
		})
		.catch(error => res.status(500).send(error));
});

export default documentsRouter;