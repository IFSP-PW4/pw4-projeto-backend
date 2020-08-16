import mongoose from 'mongoose';
import flowSchema from './schema/flowSchema';

export const Flow = mongoose.model('Flow', flowSchema);