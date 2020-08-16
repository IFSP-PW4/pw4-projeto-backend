import mongoose from 'mongoose';
import stateSchema from './schema/stateSchema';

export const State = mongoose.model('State', stateSchema);