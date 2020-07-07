import mongoose from 'mongoose';
import {DB_URI} from '../const';
import {DB_DATABASE_NAME, DB_USER} from '../const/env';

mongoose.connect(DB_URI, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log(`Successfully connected to the "${DB_DATABASE_NAME}" database as "${DB_USER}"`);
});
