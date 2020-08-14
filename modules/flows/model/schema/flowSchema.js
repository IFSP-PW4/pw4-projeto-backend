import mongoose from 'mongoose';

const flowSchema = new mongoose.Schema({
    name: String,
});

export default flowSchema;