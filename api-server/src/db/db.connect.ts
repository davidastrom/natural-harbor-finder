import mongoose from 'mongoose';

export default function connectDb(): void {
	mongoose.connect('mongodb://localhost/natural-harbor-finder');
}
