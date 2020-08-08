import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
	name: String
});

export default workspaceSchema;