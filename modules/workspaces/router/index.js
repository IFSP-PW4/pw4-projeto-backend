import express from 'express';
import bodyParser from 'body-parser';
import {Workspace} from '../model';

const workspacesRouter = express.Router();
const jsonParser = bodyParser.json();

workspacesRouter.get('/', (req, res) => {
	console.log('Fetching all workspaces...');

	Workspace.find((error, workspaces) => {
		if (error) console.error('Error when attempting to fetch all workspaces', error);
		else {
			console.log(`Found ${workspaces.length} workspaces`);
			return workspaces;
		}
	})
		.then(workspaces => res.send(workspaces))
		.catch(error => res.status(500).send(error));
});

workspacesRouter.post('/', jsonParser, (req, res) => {
	const newWorkspace = new Workspace({
		...req.body,
	});

	newWorkspace.save((error, savedWorkspace) => {
		if (error) {
			console.error('Error while saving workspace', error);
			res.status(500).send(error);
		}

		console.log('Workspace saved successfully');
		res.send(savedWorkspace);
	});
});

workspacesRouter.get('/:workspaceId', (req, res) => {
	const {workspaceId: id} = req.params;

	console.log(`Fetching workspace with id ${id}`);

	Workspace.findById(id, (error, workspace) => {
		if (error) console.error('Error when attempting to fetch workspace', error);
		else {
			console.log('Workspace found');
			return workspace;
		}
	})
		.then(workspace => res.send(workspace))
		.catch(error => res.status(500).send(error));
});

workspacesRouter.put('/:workspaceId', jsonParser, (req, res) => {
	const {workspaceId: id} = req.params;

	console.log(`Updating workspace with id ${id}`);

	Workspace.findByIdAndUpdate(id, { ...req.body, },(error, workspace) => {
		if (error) console.error('Error when attempting to update workspace', error);
		else {
			console.log('Workspace updated');
			return workspace;
		}
	})
		.then(workspace => res.send(workspace))
		.catch(error => res.status(500).send(error));
});

workspacesRouter.delete('/:workspaceId', (req, res) => {
	const {workspaceId: id} = req.params;

	console.log(`Deleting workspace with id ${id}`);

	Workspace.findByIdAndRemove(id,(error, workspace) => {
		if (error) console.error('Error when attempting to delete workspace', error);
		else {
			console.log('Workspace deleted');
			return workspace;
		}
	})
		.then(workspace => res.send(workspace))
		.catch(error => res.status(500).send(error));
});

export default workspacesRouter;