import mongoose from 'mongoose';
import workspaceSchema from './schema/workspaceSchema';

export const Workspace = mongoose.model('Workspace', workspaceSchema);