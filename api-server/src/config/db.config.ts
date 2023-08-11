import mongoose from 'mongoose';

import { RoleModel } from '../models/users/role.model';
import { AuthPermissions } from '../types/enums/authPermissions';
import { Roles } from '../types/enums/roles';

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

    const userRole = await RoleModel.findOne({name: Roles.User})
    if (!userRole) {
        const role = new RoleModel({
            name: Roles.User,
            permissions: [AuthPermissions.ReadHarbors]
        })
        role.save();
    }

    mongoose.connection.on('disconnected', connect);
};
