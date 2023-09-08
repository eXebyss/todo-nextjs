import mongoose from 'mongoose';

const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI || '');
		console.log('Connected to MongoDB.');
	} catch (error) {
		console.log(error);
	}
};

const disconnectMongoDB = async () => {
	try {
		await mongoose.disconnect();
		console.log('Disconnected from MongoDB.');
	} catch (error) {
		console.log(error);
	}
};

export { connectMongoDB, disconnectMongoDB };

export default connectMongoDB;
