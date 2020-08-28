import mongoose from 'mongoose';
import cardSchema from './schema/cardSchema';

export const Card = mongoose.model('Card', cardSchema);