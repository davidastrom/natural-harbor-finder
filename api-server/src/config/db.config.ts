import mongoose from 'mongoose';

export default async (db: string): Promise<void> => {
    const connect = () => {
        mongoose
            .connect(db)
            .then(() => {
                return console.info(`Successfully connected to ${db}`);
            })
            .catch((error) => {
                console.error('Error connecting to database: ', error);
                return process.exit(1);
            });
    };
    await connect();

    mongoose.connection.on('disconnected', connect);
};
