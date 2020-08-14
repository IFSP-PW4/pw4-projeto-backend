import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    flowId: String,
    name: String,
    description: String,
    stateId: String,
});

export default cardSchema;