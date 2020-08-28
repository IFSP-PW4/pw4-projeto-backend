import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema({
    flowId: String,
    name: String,
    order: Number,
});

export default stateSchema;