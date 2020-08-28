import mongoose from 'mongoose';
import documentSchema from './schema/documentSchema';

export const Document = mongoose.model('Document', documentSchema);